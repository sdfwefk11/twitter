import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { authService } from "twutterbase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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
    } catch (error) {}
  };
  const toggle = () => {
    setNewAccount((prev) => !prev);
  };
  return (
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
      <span onClick={toggle}>{newAccount ? "Sign In" : "Create Account"}</span>
    </form>
  );
};

export default AuthForm;
