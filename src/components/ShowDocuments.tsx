import { useEffect, useState } from "react";
import { Documents } from "../models/Document";

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
        console.log(data);
      });
  }

  let printDocuments = allDocuments.map((document, i) => {
    console.log(document.documentText);

    // let text = JSON.parse(document.documentText);
    return (
      <>
        <div key={i}>
          <h1>{document.documentTitle}</h1>
          <p> Författare: {document.author}</p>
          {/* {document.documentText}
          <p>{document.date}</p> */}
        </div>
      </>
    );
  });

  return (
    <>
      <p>{printDocuments}</p>
    </>
  );
}
