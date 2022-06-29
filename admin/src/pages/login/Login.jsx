import React, { useContext, useState } from "react";
import {useDispatch} from "react-redux";
import {login} from "../../redux/apiCalls"
import "./login.css";

const Login =() => {
    const [correo,setCorreo] = useState("");
    const [password,setPassword] = useState("");

    const dispatch = useDispatch();

    const handleClick = (e)=>{
        e.preventDefault();
        login(dispatch,{correo,password});
    };

    return (
        <div className="login">
      <form className="loginForm">
        <input
          type="text"
          placeholder="correo"
          className="loginInput"
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="loginButton"
          onClick={handleClick}
        >
          Login
        </button>
      </form>
    </div>
    );
};

export default Login;