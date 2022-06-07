import { Editor } from "@tinymce/tinymce-react";
import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { ShowDocuments } from "./components/ShowDocuments";
import { WysiwygEditor } from "./components/WysiwygEditor";

function App() {
  return (
    <>
      <WysiwygEditor></WysiwygEditor>
      <ShowDocuments></ShowDocuments>
    </>
  );
}

export default App;
