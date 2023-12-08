function Display({ output }) {

    return (
        <div style={{marginTop:"40px"}}>
            <h2>Output</h2>
            <pre>
                {JSON.stringify(output, null, 5)}
            </pre>
        </div>
    )
}

export default Display