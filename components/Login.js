"use client";
import { Chicle } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";

const fugaz = Chicle({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  const { signup, login } = useAuth();

  async function handleSubmit() {
    console.log("Email before submit:", email);
    console.log("Password before submit:", password);

    if (!email || !password || password.length < 6) {
      return;
    }

    setAuthenticating(true);

    try {
      if (isRegister) {
        console.log("Signing up a new user");
        await signup(email, password);
        console.log(email, password);
      } else {
        console.log("Logging in  existing  user ");
        await login(email, password);
        console.log(email, password);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <div className={`flex flex-col flex-1 justify-center items-center gap-4 `}>
      <h3 className={`${fugaz.className} text-4xl sm:text-5xl md:text-6xl`}>
        {isRegister ? "Register" : "Login"}
      </h3>
      <p>You&apos;re one step away!</p>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className=" rounded-full outline-none  max-w-[400px] w-full mx-auto px-3 duration-200 hover:border-indigo-800  focus:border-indigo-800 py-2 sm:py-3 border border-solid border-indigo-400"
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className=" rounded-full outline-none  max-w-[400px] w-full mx-auto px-3 duration-200 hover:border-indigo-800 focus:border-indigo-800 py-2 sm:py-3 border border-solid border-indigo-400"
        placeholder="password"
      />

      <div className="max-w-[400px] w-full mx-auto">
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? "Submitting" : "Submit"}
          full
        />
      </div>
      <p className="text-center">
        {isRegister ? "Already have an Account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-600 cursor-pointer"
        >
          {" "}
          {isRegister ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
