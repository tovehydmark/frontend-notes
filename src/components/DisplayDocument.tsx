import { Documents } from "../models/Document";

interface IDisplayDocumentProps {
  documentInfo: Documents;
}

export function DisplayDocument(props: IDisplayDocumentProps) {
  return (
    <>
      <p>{props.documentInfo.author}</p>
    </>
  );
}
