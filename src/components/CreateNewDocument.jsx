import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Documents } from "../models/Document";
import { DisplayDocument } from "./DisplayDocument";
import { useNavigate } from "react-router-dom";
import { FetchData } from "./FetchData";

export function CreateNewDocument() {
  const [documentTitle, setDocumentTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [displayReadingView, setDisplayReadingView] = useState(false);
  const [documentToDisplay, setDocumentToDisplay] = useState(
    new Documents("", "", "", "", 0)
  );

  let navigate = useNavigate();

  const editorRef = useRef(null);

  // If user is not loggedin when attempting to access route, user is redirected to login page
  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");
    if (!userFromLocalStorage) {
      navigate("/login");
      return;
    }
  });

  const log = () => {
    if (editorRef.current) {
      let documentObject = {
        documentTitle: documentTitle,
        author: author,
        documentText: editorRef.current.getContent(),
      };

      //Post new document to API
      FetchData(
        "http://localhost:3003/createDocument",
        "post",
        documentObject
      ).then((data) => console.log(data));

      alert("Nytt dokument skapat!");
      routeChange();
    }
  };

  function handleTitleChange(e) {
    setDocumentTitle(e.target.value);
  }
  function handleAuthorChange(e) {
    setAuthor(e.target.value);
  }

  function displayEditorMode() {
    // Sends current data to reading view when user clicks the button
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
    setDisplayReadingView(true);
  }

  function routeChange() {
    let path = `/showalldocuments`;
    navigate(path);
  }

  return (
    <>
      <div className="editorStyling">
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
              "removeformat",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <button onClick={log}>Spara</button>
        <button onClick={displayEditorMode}>
          {displayReadingView ? "Visa uppdaterade ändringar" : "Visa i läsläge"}
        </button>
        <button onClick={routeChange}>Avbryt</button>

        {displayReadingView ? (
          <DisplayDocument documentInfo={documentToDisplay}></DisplayDocument>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
