import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Documents } from "../models/Document";
import { DisplayDocument } from "./DisplayDocument";
import { FetchData } from "./FetchData";
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

    // Gets all documents from the database
    FetchData("http://localhost:3003/fetchDocuments").then((data) => {
      setAllDocuments(data);
    });
  }, []);

  // Gets document content after fetch is done to ensure allDocuments have the updated content after fetch
  useEffect(() => {
    getDocumentContent();
  }, [allDocuments]);

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

  function handleClick() {
    setDisplayEditor(false);
  }

  return (
    <>
      {displayEditor ? (
        <div>
          <DisplayDocument documentInfo={documentToDisplay}></DisplayDocument>{" "}
          <button onClick={handleClick}>Redigera dokument</button>
        </div>
      ) : (
        <Wysiwyg documentInfo={documentToDisplay}></Wysiwyg>
      )}
    </>
  );
}
