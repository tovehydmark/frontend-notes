import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Documents } from "../models/Document";
import { FetchData } from "./FetchData";

export function ShowAllDocuments() {
  const [allDocuments, setAllDocuments] = useState<Documents[]>([]);
  const [viewLogoutBtn, setViewLogoutBtn] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    let userFromLocalStorage = localStorage.getItem("user");

    // If user is not loggedin when attempting to access route, user is redirected to login page
    if (!userFromLocalStorage) {
      nav("/");
    } else {
      FetchData("http://localhost:3003/fetchDocuments").then((data) => {
        setAllDocuments(data);
        setViewLogoutBtn(true);
      });
    }
  }, []);

  // Prints all documents
  let printDocuments = allDocuments.map((document, i) => {
    // Formats the dates to look good
    let changeDateFormat = new Date(document.date);
    let newDateFormat = changeDateFormat.toLocaleDateString();

    return (
      <>
        <article key={document.documentId} className="documentInReadingView">
          <h1>{document.documentTitle}</h1>
          <p> Författare: {document.author}</p>
          <p>Datum: {newDateFormat}</p>
          <Link to={`/editdocument/${document.documentId}`}>Visa dokument</Link>
        </article>
      </>
    );
  });

  // Clear local storage at logout and redirect to login page
  function logout() {
    localStorage.clear();
    alert("Du loggas ut");
    nav("/");
  }

  return (
    <>
      <div className="welcome-message-position">
        <div className="buttonAndLinkPositioning">
          <h1>Välkommen!</h1>
          <p>
            Här är dina dokument. <br />
            För att visa eller redigera ett dokument, klicka på 'visa dokument'
            under respektive rubrik.
            <br />
            Skapa ett nytt dokument genom att klicka på 'skapa dokument' till
            höger.
          </p>
        </div>
        <div className="buttonAndLinkPositioning">
          <button className="createNewDocLink">
            <Link to={`/createnewdocument`}>Skapa dokument</Link>{" "}
          </button>

          {viewLogoutBtn ? <button onClick={logout}>Logga ut</button> : ""}
        </div>
      </div>
      <div className="showAllDocumentsSection">{printDocuments}</div>
    </>
  );
}
