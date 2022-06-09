import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";
import { Documents } from "../models/Document";
import { DisplayDocument } from "./DisplayDocument";

export function WysiwygEditor() {
  const [documentTitle, setDocumentTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [displayReadingView, setDisplayReadingView] = useState(false);

  const [documentToDisplay, setDocumentToDisplay] = useState(
    new Documents("", "", "", "", 0)
  );

  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
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

  function displayEditorMode() {
    // Sends current data to reading view on click (does not update if user continues to type)
    if (editorRef.current) {
      setDocumentToDisplay(
        new Documents(
          documentTitle,
          editorRef.current.getContent(),
          author,
          "",
          0
        )
      );
    }
    // Toggles displayReadingView to hide or show reading view
    setDisplayReadingView(!displayReadingView);
  }

  return (
    <>
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

      {displayReadingView ? (
        <DisplayDocument documentInfo={documentToDisplay}></DisplayDocument>
      ) : (
        ""
      )}
      <button onClick={displayEditorMode}>
        {displayReadingView ? "Dölj läsläge" : "Visa i läsläge"}
      </button>

      <Link to={`/showdocuments`}>Tillbaka till alla dokument</Link>
    </>
  );
}
