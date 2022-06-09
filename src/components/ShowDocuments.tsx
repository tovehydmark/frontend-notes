import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Documents } from "../models/Document";
import { EditDocument } from "./EditDocument";

export function ShowDocuments() {
  const [allDocuments, setAllDocuments] = useState<Documents[]>([]);

  useEffect(() => {
    showDocuments();
  }, []);

  async function showDocuments() {
    await fetch("http://localhost:3003/fetchDocuments")
      .then((res) => res.json())
      .then((data) => {
        setAllDocuments(data);
      });
  }

  //Prints all documents
  let printDocuments = allDocuments.map((document, i) => {
    return (
      <>
        <article key={document.documentId}>
          <h1>{document.documentTitle}</h1>
          <p> Författare: {document.author}</p>
          <p>{document.date}</p>
          <Link to={`/editdocument/${document.documentId}`}>Visa dokument</Link>
          <hr />
        </article>
      </>
    );
  });

  return (
    <>
      <Link to={`/editor`}>Skapa nytt dokument</Link>
      {printDocuments}
    </>
  );
}
