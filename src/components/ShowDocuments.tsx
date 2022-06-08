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
    let contacts = await fetch("http://localhost:3003/fetchDocuments")
      .then((res) => res.json())
      .then((data) => {
        setAllDocuments(data);
      });
  }

  //CreateMarkup as I'm setting inner HTML with "dangerouslySetInnerHTML" (recommendation by React documentation to use markup)
  function createMarkup(i: number) {
    return { __html: allDocuments[i].documentText };
  }

  //Prints all documents
  let printDocuments = allDocuments.map((document, i) => {
    createMarkup(i);

    return (
      <>
        <article key={document.documentId}>
          <h1>{document.documentTitle}</h1>
          <p> Författare: {document.author}</p>
          <p>{document.date}</p>
          {/* <EditDocument documentinfo={document}></EditDocument>; */}
          {/* Lägg editDocument komponent här och skicka med dokumentet som props. I den komponenten gör vi sedan en put. Visa Editor komponenten där och skicka via props för att få ut rätt innehåll? */}

          <Link to={`/editdocument/${document.documentId}`}>
            Redigera dokument
          </Link>

          <div dangerouslySetInnerHTML={createMarkup(i)}></div>
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
