"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";

export default function CallToAction() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <motion.div
        className="mx-w-[600px] mx-auto w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Link href={"/dashboard"}>
          <Button full dark text="Got to Dashboard" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 gap-8 w-fit mx-auto"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <Link href={"dashboard"}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button text="Sign Up" />
        </motion.div>
      </Link>
      <Link href={"dashboard"}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button text="Login" dark />
        </motion.div>
      </Link>
    </motion.div>
  );
}
