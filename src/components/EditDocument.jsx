import { Editor } from "@tinymce/tinymce-react";
import { useRef, useEffect, useState } from "react";
import { Documents } from "../models/Document";

export function EditDocument(props) {
  const [startValue, setStartValue] = useState("");
  // const [updatedText, setUpdatedText] = useState("");

  // Sets the start value in the editor to the document text derived from props
  useEffect(() => {
    setStartValue(props.documentinfo.documentText);
  }, []);

  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      //Här göra put för att uppdatera dokumentet

      let updatedText = {
        documentText: editorRef.current.getContent(),
        id: props.documentinfo.documentId,
      };
      console.log(updatedText);
      updateDocument(updatedText);
    }
  };

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

  return (
    <>
      <Editor
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
      <button onClick={log}>Spara</button>
    </>
  );
}
