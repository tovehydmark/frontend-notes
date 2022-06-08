import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";

//Props för att kunna fånga document objektet

export function WysiwygEditor(props) {
  const [documentTitle, setDocumentTitle] = useState("");
  const [author, setAuthor] = useState("");

  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());

      let documentObject = {
        documentTitle: documentTitle,
        author: author,
        documentText: editorRef.current.getContent(),
      };

      addDocument(documentObject);
    }
  };

  //Post new document to API
  async function addDocument(documentObject) {
    await fetch("http://localhost:3003/createDocument", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(documentObject),
    }).then((data) => console.log(data));
  }

  function handleTitleChange(e) {
    setDocumentTitle(e.target.value);
  }
  function handleAuthorChange(e) {
    setAuthor(e.target.value);
  }

  //Redigera dokument: skicka via props
  //props sträng som sätter initial value till <p>Skriv här...</p>, alternativt det som hämtas från databasen

  return (
    <>
      <form method="post" onSubmit={addDocument}>
        <h1>Titel: {documentTitle}</h1>
        <input type="text" value={documentTitle} onChange={handleTitleChange} />

        <p>Författare: {author}</p>
        <input type="text" value={author} onChange={handleAuthorChange} />

        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>Skriv här...</p>"
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
        <button onClick={log}>Spara</button>
      </form>

      <button>Visa färdigt dokument</button>

      <Link to={`/showdocuments`}>Tillbaka till alla dokument</Link>
    </>
  );
}
