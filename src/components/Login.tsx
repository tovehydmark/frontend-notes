import { useEffect, useState } from "react";
import { FetchData } from "./FetchData";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  useEffect(() => {}, []);

  //Compares user input with database data
  function loginUser() {
    let userObject = { userName: username, password: password };

    FetchData("http://localhost:3003/login", "POST", userObject).then(
      (data) => {
        if (data.status == 200) {
          // Saves userId to localstorage to keep user loggedin
          localStorage.setItem("user", JSON.stringify(data.userId));

          //Redirects user to loggedin page
          nav("/showalldocuments");
        } else {
          alert("Fel användarnamn eller lösenord");
        }
      }
    );
  }

  return (
    <>
      <h1>Logga in i dokumenthanteraren</h1>

      <label htmlFor="username">Användarnamn: </label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Lösenord: </label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginUser}>Logga in </button>
    </>
  );
}
