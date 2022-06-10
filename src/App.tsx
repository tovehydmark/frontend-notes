import { HashRouter, Route, Routes } from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import { DisplayDocument } from "./components/DisplayDocument";
import { EditDocument } from "./components/EditDocument";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { NotFound } from "./components/NotFound";
import { ShowAllDocuments } from "./components/ShowAllDocuments";
import { CreateNewDocument } from "./components/CreateNewDocument";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/showalldocuments" element={<ShowAllDocuments />} />
            <Route path="/createnewdocument" element={<CreateNewDocument />} />
            <Route path="/editdocument/:id" element={<EditDocument />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
