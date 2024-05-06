import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {auth,logInWithEmailAndPassword, signInWithGoogle} from "../Firebase"
import "./Login.css";
import {useAuthState} from "react-firebase-hooks/auth"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user,loading,error]=useAuthState(auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(loading) return;
    if (user) navigate("/dashboard")
  },[user,loading])
  const login=()=>{
    if(email!=="" && password!==""){
      logInWithEmailAndPassword(email, password)
      // .then(() => {
      //     navigate("/dashboard");
      //   })
      .catch((error) => {
          alert("INVALID_LOGIN_CREDENTIALS");
      })}
    else{
      alert("Enter your Email and Password")
    }
  }
  return (
    <div className="login">
      <div className="login_box">
        <input
          type="text"
          className="login_einput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login_pinput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login_btn"
         onClick={login}
        >
          Login
        </button>
        <button
          className="login_btn login_googlebtn"
          onClick={signInWithGoogle}
        >
          <div>
            Login with Google
            <img
              src="https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png"
              alt=""
            />
          </div>
        </button>
        <div className="extra_options">
          <div>
            <Link to="/reset">Forgot Password</Link>
          </div>
          <div>
            Don't have an account? <Link to="/register">Register</Link> now.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
