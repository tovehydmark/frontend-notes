import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Link } from "react-router-dom";
import { FetchData } from "./FetchData";

export function Wysiwyg(props) {
  const editorRef = useRef(null);
  const [title, setTitle] = useState(props.documentInfo.documentTitle);
  const [author, setAuthor] = useState(props.documentInfo.author);

  // Gets value from the text field and sends it with PUT to the database
  const updateDocument = () => {
    if (editorRef.current) {
      let updatedText = {
        documentText: editorRef.current.getContent(),
        documentTitle: title,
        author: author,
        documentId: props.documentInfo.documentId,
      };

      //Updates content in database
      FetchData(
        "http://localhost:3003/updateDocuments",
        "put",
        updatedText
      ).then((data) => {
        console.log(data);
      });
      alert("Ändringar sparade");
    }
  };

  // Updates title and author
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleAuthorChange(e) {
    setAuthor(e.target.value);
  }

  return (
    <>
      <div className="editorStyling">
        <Link to={`/showalldocuments`}>Tillbaka till alla dokument</Link>
        <form method="put">
          <h1>Rubrik: {title}</h1>

          <label htmlFor="title">Uppdatera rubrik: </label>
          <input type="text" name="title" onChange={handleTitleChange} />

          <p>Författare: {author}</p>

          <label htmlFor="author">Uppdatera författare: </label>
          <input type="text" name="author" onChange={handleAuthorChange} />

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
                "removeformat",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <button onClick={updateDocument}>Spara uppdatering</button>
        </form>
      </div>
    </>
  );
}
