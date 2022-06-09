import { useEffect, useState } from "react";
import { Documents } from "../models/Document";

import "../styles/style.scss";

interface IDisplayDocumentProps {
  documentInfo: Documents;
  // reRenderParent(): void;
}

export function DisplayDocument(props: IDisplayDocumentProps) {
  // const [documentToDisplay, setDocumentToDisplay] = useState(
  //   new Documents("", "", "", "", 0)
  // );

  // function updateParent() {
  //   props.reRenderParent();
  // }

  // function getDocumentData() {
  //   // updateParent();

  //   let document = new Documents(
  //     props.documentInfo.documentTitle,
  //     props.documentInfo.documentText,
  //     props.documentInfo.author,
  //     props.documentInfo.date,
  //     props.documentInfo.documentId
  //   );
  // setDocumentToDisplay(document);
  // }

  // useEffect(() => {
  //   getDocumentData();
  // }, []);

  return (
    <>
      <div className="readingview-div">
        <h1>{props.documentInfo.documentTitle}</h1>
        <p>{props.documentInfo.author}</p>
        <p>{props.documentInfo.date}</p>
        <p>{props.documentInfo.documentText}</p>
      </div>
      {/* <p>{documentToDisplay.author}</p> */}
    </>
  );
}
