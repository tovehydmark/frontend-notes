import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Documents } from "../models/Document";
import { FetchData } from "./FetchData";

export function ShowAllDocuments() {
  const [allDocuments, setAllDocuments] = useState<Documents[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    // If user is not loggedin when attempting to access route, user is redirected to login page
    if (!userFromLocalStorage) {
      nav("/");
    } else {
      FetchData("http://localhost:3003/fetchDocuments").then((data) => {
        setAllDocuments(data);
      });
    }
  }, []);

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
      <Link to={`/createnewdocument`}>Skapa nytt dokument</Link>
      {printDocuments}
    </>
  );
}
