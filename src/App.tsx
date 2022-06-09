import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import { DisplayDocument } from "./components/DisplayDocument";
import { EditDocument } from "./components/EditDocument";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { NotFound } from "./components/NotFound";
import { ShowDocuments } from "./components/ShowDocuments";
import { WysiwygEditor } from "./components/CreateNewDocument";
import { Documents } from "./models/Document";

function App() {
  let documentInfo = new Documents("", "", "", "", 0);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/showdocuments" element={<ShowDocuments />} />
            <Route path="/editor" element={<WysiwygEditor />} />
            <Route path="/editdocument/:id" element={<EditDocument />} />
            <Route
              path="/displaydocument/:id"
              element={
                <DisplayDocument
                  documentInfo={documentInfo}
                  // reRenderParent={function (): void {}}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
