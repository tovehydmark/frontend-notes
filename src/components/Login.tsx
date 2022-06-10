import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FetchData } from "./FetchData";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {}, []);

  //Compares user input with database data
  function loginUser() {
    console.log("klick");

    let userObject = { userName: username, password: password };

    FetchData("http://localhost:3003/login", "POST", userObject).then(
      (data) => {
        console.log(data);

        if (data.status == 200) {
          // Saves userId to localstorage to keep user loggedin
          localStorage.setItem("user", JSON.stringify(data.userId));

          //Redirects user to loggedin page
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
