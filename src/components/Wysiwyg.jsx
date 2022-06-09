import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";
import { FetchData } from "./FetchData";

export function Wysiwyg(props) {
  const editorRef = useRef(null);

  // Gets value from the text field and sends it with PUT to the database
  const updateDocument = () => {
    if (editorRef.current) {
      let updatedText = {
        documentText: editorRef.current.getContent(),
        documentId: props.documentInfo.documentId,
      };

      //Updates content in database
      FetchData(
        "http://localhost:3003/updateDocuments",
        "put",
        updatedText
      ).then((data) => {
        console.log(data);
      });
      alert("Ändringar sparade");
    }
  };

  return (
    <>
      <Link to={`/showdocuments`}>Tillbaka till alla dokument</Link>
      <form method="put">
        <h1>Titel: {props.documentInfo.documentTitle}</h1>

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
              "removeformat",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button onClick={updateDocument}>Spara uppdatering</button>
      </form>
    </>
  );
}
