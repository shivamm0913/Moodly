"use client";
import { Chicle } from "next/font/google";
import React from "react";
import Calendar from "./Calendar";
import CallToAction from "./CallToAction";
import { motion } from "framer-motion";

const fugaz = Chicle({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Hero() {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10">
      <motion.h1
        className={`${fugaz.className} text-5xl sm:text-6xl md:text-7xl text-center`}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="textGradient">Moodly</span> helps you track{" "}
        <span className="textGradient">daily </span>
        mood!
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[550px]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        Create your mood record and see how you feel on{" "}
        <span className="font-semibold">every day of every year</span>
      </motion.p>

      <CallToAction />
      <Calendar demo />
    </div>
  );
}
