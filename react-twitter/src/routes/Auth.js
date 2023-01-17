import { async } from "@firebase/util";
import React, { useState } from "react";
import { authService } from "twutterbase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    const createAccount = createUserWithEmailAndPassword(
      authService,
      email,
      password
    );
    const signIn = signInWithEmailAndPassword(authService, email, password);
    event.preventDefault();
    try {
      if (newAccount) {
        await createAccount;
      } else {
        await signIn;
      }
      // console.log(createAccount, signIn);
    } catch (error) {}
  };
  const toggle = () => {
    setNewAccount((prev) => !prev);
  };
  const onSocialClick = async (event) => {
    const auth = getAuth();
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(auth, provider);
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
        ></input>
        <input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
        ></input>
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
        ></input>
        <span onClick={toggle}>
          {newAccount ? "Sign In" : "Create Account"}
        </span>
      </form>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
