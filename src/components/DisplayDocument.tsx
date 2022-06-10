import { Link } from "react-router-dom";
import { Documents } from "../models/Document";

import "../styles/style.scss";

interface IDisplayDocumentProps {
  documentInfo: Documents;
}

export function DisplayDocument(props: IDisplayDocumentProps) {
  const parse = require("html-react-parser");

  return (
    <>
      <Link to={`/showalldocuments`}>Tillbaka till alla dokument</Link>
      <div className="reading-view">
        <h1>Rubrik: {props.documentInfo.documentTitle}</h1>
        <p>Författare: {props.documentInfo.author}</p>
        <p>Datum: {props.documentInfo.date}</p>
        <hr />
        <div>{parse(props.documentInfo.documentText)}</div>
      </div>
    </>
  );
}
