import React from "react";

export default function Login() {
  return (
    <div style={{textAlign:"center"}}>
      <h1>ExamNova Login</h1>
      <input type="email" placeholder="Email" /><br/><br/>
      <input type="password" placeholder="Password" /><br/><br/>
      <button>Login</button>
    </div>
  );
}
