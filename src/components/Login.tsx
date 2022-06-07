import { Link } from "react-router-dom";

export function Login() {
  return (
    <>
      <h1>Hej Logga in då</h1>
      <Link to={`/showdocuments`}>Visa dokument</Link>
      <Link to={`/editor`}>Skapa nytt dokument</Link>
    </>
  );
}
