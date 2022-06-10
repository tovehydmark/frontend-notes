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
      <Link to={`/showdocuments`}>Tillbaka till alla dokument</Link>
      <div className="reading-view">
        <h1>{props.documentInfo.documentTitle}</h1>
        <p>{props.documentInfo.author}</p>
        <p>{props.documentInfo.date}</p>
        <div>{parse(props.documentInfo.documentText)}</div>
      </div>
    </>
  );
}
