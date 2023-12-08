import { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from "@mui/material";
import Display from "./Display";
import "../Stylesheets/ProofForm.scss"

function ProofForm() {
    const [output, setOutput] = useState(null) //State to send the formatted output as prop to "Display" component
    const [proof, setProof] = useState(false) // State to display Proof-container
    const [display, setDisplay] = useState(false) // State to display the output
    const [proofName, setProofName] = useState("") // State for Proof Name

    // State for input-details
    const initialForm = {
        documentName: "",
        groupLabel: ""
    }
    const [forms, setForms] = useState([{ id: 1, data: initialForm }])

    // To handle Proof name
    const handleProofName = (e) => {
        setProofName(e.target.value)
    }

    //To handle addition of new field
    const handleAdd = () => {
        const newId = forms.length + 1;
        setForms((prevForms) => [
            ...prevForms,
            { id: newId, data: initialForm },
        ]);
    }

    //To handle deletion of a field
    const handleDelete = (id) => {
        setForms((prevForms) =>
            prevForms.filter((form) => form.id !== id).map((form, index) => ({
                ...form,
                id: index + 1,
            }))
        );
    }

    //To handle the data entered in "document-name" and "Group-label" fields
    const handleChange = (id, name, value) => {
        setForms((prevForms) =>
            prevForms.map((form) =>
                form.id === id ? name === "groupLabel" ? { ...form, data: { ...form.data, [name]: value.toUpperCase() } } :
                    { ...form, data: { ...form.data, [name]: value } } : form
            )
        );
    }

    //To handle the data entered and display in JSON format
    const handleSubmit = () => {

        //To group the "forms" state according to Group-label
        let grouping = forms.reduce((result, form, index) => {
            let groupLabel = form.data.groupLabel.toUpperCase() || '';
            if (!result[groupLabel]) {
                result[groupLabel] = [];
            }
            result[groupLabel].push(form);
            return result;
        }, {});

        //After grouping, we need to change the "id" for the elements inside Group-label in ascending order
        // Method-1
        Object.values(grouping).map((elements) => {
            elements.map((element, index) => {
                element.id = index + 1
            })
        })

        //Method-2
        // Object.keys(grouping).map((ele, index) => {
        //     Object.keys(grouping[ele]).map((e, index) => {
        //         grouping[ele][e].id = index + 1;

        //     })
        // })

        setDisplay(true)
        setOutput({ ProofName: proofName, ProofDetails: Object.values(grouping) })
        setProofName("")
        setProof(false)

        //Asynchronous operation to clear the form field after one second
        setTimeout(() => {
            setForms([{ id: 1, data: initialForm }]);
        }, 1000)

    }

    // After the focus is out from "group label", group the inputs based on the groupLabel
    const handleBlur = () => {
        const groupedInputs = {};
        forms.forEach((form, index) => {
            let { groupLabel } = form.data;
            groupLabel = groupLabel.toUpperCase();
            //Check whether "groupedInputs" has the property groupLabel
            if (!groupedInputs[groupLabel]) {
                groupedInputs[groupLabel] = [];
            }

            //Push the fields belonging to particular groupLabel into the "groupLabel" property of "groupedInputs" Object
            groupedInputs[groupLabel].push(
                <div key={index} className="input-document">
                    <p>{groupedInputs[groupLabel].length + 1}</p>
                    <TextField id="outlined-basic" label="Document Name" variant="outlined"
                        name="documentName"
                        value={form.data.documentName}
                        onChange={(e) => handleChange(form.id, e.target.name, e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Group Label" variant="outlined"
                        name="groupLabel"
                        value={form.data.groupLabel.toUpperCase()}
                        onBlur={handleBlur} // when the focus from this field is out, then it recurse the same function inorder to group it
                        onChange={(e) => handleChange(form.id, e.target.name, e.target.value)}
                    />
                    <IconButton className="add-btn" onClick={handleAdd} >
                        <AddIcon />
                    </IconButton>

                    <IconButton className="delete-btn" onClick={() => handleDelete(form.id)}  >
                        <RemoveIcon />
                    </IconButton>
                </div>
            );
        });

        // Rendering grouped inputs
        return Object.values(groupedInputs).map((group, index) => (
            <div key={index} className="group-header">
                {group}
            </div>
        ));
    };

    return (
        <main className="documentsForm-container">
            <section className="df-head">
                <h2>Application Proof</h2>
                <Button variant="contained" disabled={proof} onClick={() => {
                    // To Display Proof-container
                    setProof(true)
                    setDisplay(false)
                }}>
                    Add Proof
                </Button>
            </section>
            {proof && <section style={{ textAlign: "center" }}>
                <div className="df-body">
                    <TextField id="outlined-basic" label="Proof Name" variant="outlined" className="input-proof" name="proofName" value={proofName}
                        onChange={handleProofName}
                        inputProps={{
                            style: { textAlign: 'center' },
                        }}
                    />

                    {/* Initially to display the input fields */}
                    {handleBlur()}

                </div>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </section>
            }

            {/* To display the output in JSON format */}
            {display && <Display output={output} />}

        </main>
    )
}

export default ProofForm