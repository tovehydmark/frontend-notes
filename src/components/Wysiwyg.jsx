import { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";

export function Wysiwyg(props) {
  const editorRef = useRef(null);

  useEffect(() => {
    console.log(props);
  });

  // Gets value from the text field and sends it with PUT to the database

  const updateDocument = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());

      let updatedText = {
        documentText: editorRef.current.getContent(),
        documentId: props.documentInfo.documentId,
      };
      updateDocumentWithPut(updatedText);
      alert("Ändringar sparade");
    }
  };

  // Updates the document in the database
  async function updateDocumentWithPut(updatedText) {
    await fetch("http://localhost:3003/fetchDocuments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedText),
    }).then((data) => {
      console.log(data);
    });
  }

  return (
    <>
      {" "}
      {/* <h1>Titel: {props.documentInfo.documentTitle}</h1> */}
      <form method="put">
        <h1>Titel: {props.documentInfo.documentTitle}</h1>
        {/* <input type="text" value="" /> */}

        <p>Författare: {props.documentInfo.author}</p>

        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={props.documentInfo.documentText}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button onClick={updateDocument}>Spara uppdatering</button>
      </form>
      <Link to={`/showdocuments`}>Tillbaka till alla dokument</Link>
    </>
  );
}
