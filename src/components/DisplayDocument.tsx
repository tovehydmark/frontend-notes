import { Link } from "react-router-dom";
import { Documents } from "../models/Document";

import "../styles/style.scss";

interface IDisplayDocumentProps {
  documentInfo: Documents;
}

export function DisplayDocument(props: IDisplayDocumentProps) {
  return (
    <>
      <Link to={`/showdocuments`}>Tillbaka till alla dokument</Link>
      <div className="reading-view">
        <h1>{props.documentInfo.documentTitle}</h1>
        <p>{props.documentInfo.author}</p>
        <p>{props.documentInfo.date}</p>
        <p>{props.documentInfo.documentText}</p>
      </div>
    </>
  );
}
