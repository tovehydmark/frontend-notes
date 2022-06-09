import { Link } from "react-router-dom";
import { Documents } from "../models/Document";

import "../styles/style.scss";

interface IDisplayDocumentProps {
  documentInfo: Documents;
}

export function DisplayDocument(props: IDisplayDocumentProps) {
  // Using createMarkup as I'm setting inner HTML with "dangerouslySetInnerHTML" (recommendation by React documentation to use markup)
  function createMarkup() {
    return { __html: props.documentInfo.documentText };
  }

  return (
    <>
      <Link to={`/showdocuments`}>Tillbaka till alla dokument</Link>
      <div className="reading-view">
        <h1>{props.documentInfo.documentTitle}</h1>
        <p>{props.documentInfo.author}</p>
        <p>{props.documentInfo.date}</p>
        <div dangerouslySetInnerHTML={createMarkup()}></div>
      </div>
    </>
  );
}
