import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";
import { Documents } from "../models/Document";

export function Wysiwyg(props) {
  const editorRef = useRef(null);

  useEffect(() => {
    console.log(props);
  });

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());

      //   let documentObject = {
      //     documentTitle: documentTitle,
      //     author: author,
      //     documentText: editorRef.current.getContent(),
      //   };

      //   addDocument(documentObject);

      //Skicka in props här
      // beroende på om det är post eller put, ha olika saker inskickade i posten
    }
  };

  //

  //   function handleTitleChange(e) {
  //     setDocumentTitle(e.target.value);
  //   }
  //   function handleAuthorChange(e) {
  //     setAuthor(e.target.value);
  //   }

  return (
    <>
      {" "}
      {/* <h1>Titel: {props.documentInfo.documentTitle}</h1> */}
      <form method="put">
        <h1>Titel: {props.documentInfo.documentTitle}</h1>
        {/* <input type="text" value="" /> */}

        <p>Författare: {props.documentInfo.author}</p>

        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={props.documentInfo.documentText}
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
        <button onClick={log}>Spara</button>
      </form>
      <button>Visa färdigt dokument</button>
      <Link to={`/showdocuments`}>Tillbaka till alla dokument</Link>
    </>
  );
}

//Post new document to API
//   async function addDocument(documentObject) {
//     await fetch("http://localhost:3003/createDocument", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(documentObject),
//     }).then((data) => console.log(data));
//   }
