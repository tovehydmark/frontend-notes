import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Documents } from "../models/Document";
import { DisplayDocument } from "./DisplayDocument";
import { Wysiwyg } from "./Wysiwyg";

export function EditDocument() {
  const [startValue, setStartValue] = useState("");
  const [allDocuments, setAllDocuments] = useState([]);
  const [thisDocumentId, setThisDocumentId] = useState(0);
  const [displayEditor, setDisplayEditor] = useState(true);
  const [documentToDisplay, setDocumentToDisplay] = useState(
    new Documents("", "", "", "", 0)
  );

  let params = useParams();

  useEffect(() => {
    // Saves params id to a variable
    setThisDocumentId(params.id);
    showDocuments();
  }, []);

  // Gets document content after fetch is done to ensure allDocuments have the updated content after fetch
  useEffect(() => {
    getDocumentContent();
  }, [allDocuments]);

  // Gets all documents from the database
  async function showDocuments() {
    await fetch("http://localhost:3003/fetchDocuments")
      .then((res) => res.json())
      .then((data) => {
        setAllDocuments(data);
      });
  }

  // Finds the document of interest by comparing the params id and the document id
  function getDocumentContent() {
    allDocuments.find((doc) => {
      if (doc.documentId == thisDocumentId) {
        setStartValue(doc.documentText);

        setDocumentToDisplay({
          documentTitle: doc.documentTitle,
          documentText: doc.documentText,
          author: doc.author,
          date: doc.date,
          documentId: doc.documentId,
        });
      }
    });
  }

  // Toggles displayEditor to show the editor when user clicks edit, or shows in reading mode if not
  function handleClick() {
    setDisplayEditor(!displayEditor);
  }

  return (
    <>
      {displayEditor ? (
        <DisplayDocument documentInfo={documentToDisplay}></DisplayDocument>
      ) : (
        <Wysiwyg documentInfo={documentToDisplay}></Wysiwyg>
      )}

      <button onClick={handleClick}>
        {displayEditor ? "Redigera dokument" : "Visa i läsläge"}
      </button>
    </>
  );
}
