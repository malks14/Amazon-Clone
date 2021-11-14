import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css";
import { auth } from "../firebase";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const userHandler = (event) => {
    setUser(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const signInHandler = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const registerHandler = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };
  const signinUpHandler = (event) => {
    if (isLogin) {
      signInHandler(event);
    } else {
      registerHandler(event);
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className="login__container">
        <h1>{isLogin ? "Sign In" : "Sign Up"}</h1>
        <form>
          {!isLogin && <label htmlFor="user">Username</label>}
         {!isLogin && <input
            value={user}
            type="text"
            id="user"
            onChange={userHandler}
          />}
          <label htmlFor="email">Email</label>
          <input
            value={email}
            type="email"
            id="email"
            onChange={emailHandler}
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            type="password"
            id="password"
            onChange={passwordHandler}
          />
          {/* <h5>E-mail</h5>
          <input type="text" />
          <h5>Password</h5>
          <input type="password" /> */}
          <button
            type="submit"
            onClick={signinUpHandler}
            className="login__signInButton"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          onClick={switchAuthModeHandler}
          className="login__registerButton"
        >
          {isLogin
            ? "Create your Amazon account"
            : "Login with existing account"}
        </button>
      </div>
    </div>
  );
};

export default Login;
