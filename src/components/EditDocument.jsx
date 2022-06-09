import { Editor } from "@tinymce/tinymce-react";
import { useRef, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Documents } from "../models/Document";
import { DisplayDocument } from "./DisplayDocument";
import { NotFound } from "./NotFound";
import { ShowDocuments } from "./ShowDocuments";
import { Wysiwyg } from "./Wysiwyg";

export function EditDocument() {
  const [startValue, setStartValue] = useState("");
  const [allDocuments, setAllDocuments] = useState([]);
  const [thisDocumentId, setThisDocumentId] = useState(0);
  const editorRef = useRef(null);
  const [displayEditor, setDisplayEditor] = useState(true);
  const [documentToDisplay, setDocumentToDisplay] = useState(
    new Documents("", "", "", "", 0)
  );

  let params = useParams();

  useEffect(() => {
    // Saves params id to a variable
    setThisDocumentId(params.id);
    showDocuments();
  }, []);

  // Gets document content after fetch is done to ensure allDocuments have the updated content after fetch
  useEffect(() => {
    getDocumentContent();
  }, [allDocuments]);

  // Gets all documents from the database
  async function showDocuments() {
    await fetch("http://localhost:3003/fetchDocuments")
      .then((res) => res.json())
      .then((data) => {
        setAllDocuments(data);
      });
  }

  // Finds the document of interest by comparing the params id and the document id
  function getDocumentContent() {
    allDocuments.find((doc) => {
      if (doc.documentId == thisDocumentId) {
        setStartValue(doc.documentText);

        setDocumentToDisplay({
          documentTitle: doc.documentTitle,
          documentText: doc.documentText,
          author: doc.author,
          date: doc.date,
          documentId: doc.documentId,
        });
      }
    });
  }

  // Gets value from the text field and sends it with PUT to the database
  const log = () => {
    if (editorRef.current) {
      let updatedText = {
        documentText: editorRef.current.getContent(),
      };
      updateDocument(updatedText);
    }
  };

  // Updates the document in the database
  async function updateDocument(updatedText) {
    await fetch("http://localhost:3003/fetchDocuments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedText),
    }).then((data) => {
      console.log(data);
    });
  }

  function handleClick() {
    setDisplayEditor(!displayEditor);
  }
  //Kan jag lägga en boolean och visa redigering/fintext beroende på om den är true eller false?

  // let showDocument = documentToDisplay.map((doc) => {
  //   return (
  //     <>
  //       <h1>{doc.documentTitle}</h1>
  //       <p>{doc.author}</p>
  //       <p>{doc.date}</p>
  //       <p>{doc.documentText}</p>
  //     </>
  //   );
  // });

  // function renderParentComponentFromChild() {
  //   setRerenderParentFromChild(!rerenderParentFromChild);

  //   console.log("parent has rerendered");
  // }

  //DocumentToDisplay skickar ej data till dens barn via props om man uppdaterar sidan eftersom inte förälderkomponenten genereras. Vad göra åt detta?
  //Skickar inte heller props när man går från dokumentlistan

  return (
    <>
      {displayEditor ? (
        <DisplayDocument
          // reRenderParent={renderParentComponentFromChild}
          documentInfo={documentToDisplay}
        ></DisplayDocument>
      ) : (
        <Wysiwyg documentInfo={documentToDisplay}></Wysiwyg>
      )}
      <button onClick={handleClick}>
        {displayEditor ? "Redigera dokument" : "Visa i läsläge"}
      </button>

      {/* <article>
        <h1>{documentToDisplay.documentTitle}</h1>
        <p>{documentToDisplay.author}</p>
        <p>{documentToDisplay.date}</p>
        <p>{documentToDisplay.documentText}</p>
      </article> */}

      {/* <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={startValue}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <button onClick={log}>Spara</button> */}

      {/* <Link to={`/showdocuments`}>Tillbaka till alla dokument</Link> */}
    </>
  );
}
