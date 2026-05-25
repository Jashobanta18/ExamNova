import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      {page === "login" ? <Login /> : <Signup />}

      <div style={{textAlign:"center", marginTop:"20px"}}>
        <button onClick={() => setPage("login")}>Login</button>
        <button onClick={() => setPage("signup")}>Signup</button>
      </div>
    </div>
  );
}
