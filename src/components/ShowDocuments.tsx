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
        <div key={i}>
          <h1>{document.documentTitle}</h1>
          <p> Författare: {document.author}</p>
          <p dangerouslySetInnerHTML={createMarkup(i)}></p>
          <p>{document.date}</p>
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
