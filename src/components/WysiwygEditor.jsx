import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export function WysiwygEditor() {
const [documentTitle, setDocumentTitle] = useState("")
const [author, setAuthor] = useState("")

  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());

      //Här gör vi en post till api:et
    }
  };

  function handleTitleChange(e) {
    setDocumentTitle(e.target.value);
  }
  function handleAuthorChange(e){
    setAuthor(e.target.value)
  }

  return (
    <>
    <h1>Titel: {documentTitle}</h1>
    <input type="text" value={documentTitle} onChange={handleTitleChange}/>   
    
    <p>Författare: {author}</p>
    <input type="text" value={author} onChange={handleAuthorChange}/> 

      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>Skriv här...</p>"
        
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
      <button>Visa färdigt dokument</button>
      <button>Tillbaka till startsidan</button>
    </>
  );
}
