import React from "react";

export default function Signup() {
  return (
    <div style={{textAlign:"center"}}>
      <h1>ExamNova Signup</h1>
      <input type="text" placeholder="Full Name" /><br/><br/>
      <input type="email" placeholder="Email" /><br/><br/>
      <input type="password" placeholder="Password" /><br/><br/>
      <button>Signup</button>
    </div>
  );
}
