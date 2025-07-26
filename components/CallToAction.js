"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React from "react";
import Button from "./Button";

export default function CallToAction() {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <div className="mx-w-[600px] mx-auto w-full ">
        <Link href={"/dashboard"}>
          <Button full dark text="Got to Dashboard" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-8 w-fit mx-auto">
      <Link href={"dashboard"}>
        <Button text="Sign Up " />
      </Link>
      <Link href={"dashboard"}>
        <Button text="Login" dark />
      </Link>
    </div>
  );
}
