"use client";
import { Chicle } from "next/font/google";
import React, { useState } from "react";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

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
    if (!email || !password || password.length < 6) return;

    setAuthenticating(true);

    try {
      if (isRegister) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setAuthenticating(false);
    }
  }

  return (
    <motion.div
      className="flex flex-col flex-1 justify-center items-center gap-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h3
        className={`${fugaz.className} text-4xl sm:text-5xl md:text-6xl`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isRegister ? "Register" : "Login"}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        You&apos;re one step away!
      </motion.p>

      <motion.input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-full outline-none max-w-[400px] w-full mx-auto px-3 duration-200 hover:border-indigo-800 focus:border-indigo-800 py-2 sm:py-3 border border-solid border-indigo-400"
        placeholder="Email"
        whileFocus={{ scale: 1.02 }}
      />

      <motion.input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-full outline-none max-w-[400px] w-full mx-auto px-3 duration-200 hover:border-indigo-800 focus:border-indigo-800 py-2 sm:py-3 border border-solid border-indigo-400"
        placeholder="Password"
        whileFocus={{ scale: 1.02 }}
      />

      <motion.div
        className="max-w-[400px] w-full mx-auto"
        whileHover={{ scale: 1.02 }}
      >
        <Button
          clickHandler={handleSubmit}
          text={authenticating ? "Submitting" : "Submit"}
          full
        />
      </motion.div>

      <motion.p
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isRegister ? "Already have an Account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-600 cursor-pointer"
        >
          {isRegister ? "Sign In" : "Sign Up"}
        </button>
      </motion.p>
    </motion.div>
  );
}
