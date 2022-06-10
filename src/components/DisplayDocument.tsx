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
      <hr />
      <Link to={`/showalldocuments`}>Tillbaka till alla dokument</Link>

      <hr />
      <div className="reading-mode">
        <div className="centerAlignHeading">
          <h1>Rubrik: {props.documentInfo.documentTitle}</h1>
          <p>Författare: {props.documentInfo.author}</p>
          <p>Datum: {props.documentInfo.date}</p>
        </div>
        <div>{parse(props.documentInfo.documentText)}</div>
      </div>
    </>
  );
}
