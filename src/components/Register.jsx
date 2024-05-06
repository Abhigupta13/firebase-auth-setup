import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {useAuthState} from "react-firebase-hooks/auth"
import {auth,registerWithEmailAndPassword, signInWithGoogle} from "../Firebase"
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user,loading,error]=useAuthState(auth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(loading) return;
    if (user) navigate("/dashboard")
  },[user,loading])
  const register=()=>{
    if(name!==""){
      registerWithEmailAndPassword(name,email,password);
      navigate("/dashboard");
    }
    else{
      alert("Enter your name")
    }
  }
  return (
    <div className="login">
      <div className="login_box">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="register__btn"
          onClick={register}
        >
          Register
        </button>
        <button
          className="register__btn register__google"
        onClick={signInWithGoogle}
        >
          <div>
            Register with Google
            <img
              src="https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png"
              alt=""
            />
          </div>
        </button>
        <div style={{ marginTop: "20px" }}>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Register;
