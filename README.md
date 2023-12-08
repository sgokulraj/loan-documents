# loan-documents

In the context of our loan application system, each loan application type
necessitates the collection of specific documents. This machine test focuses
on constructing a backend/admin screen dedicated to defining document
requirements.

Use Case:
Our objective is to gather proof through various documents, each
categorized with a distinct group label. To illustrate, we aim to introduce a
new proof category—let's call it "Employment Proof." This category will
encompass documents like Salary Slips and Income Tax Returns, both of
which share "Income Proof" as their group label. Similarly, documents such
as an Offer Letter and ID Card will fall under the "Employee Proof" category.
On the user interface, our preference is to present the proof categories
prominently, followed by a display of associated documents beneath each
proof. A crucial requirement is the automatic grouping of documents on the
frontend, ensuring that documents sharing the same group label are
intuitively organized.
