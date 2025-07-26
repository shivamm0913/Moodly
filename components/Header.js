"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Logout from "@/components/Logout";
import { Chicle } from "next/font/google";

const fugaz = Chicle({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Header() {
  return (
    <motion.header
      className="p-4 sm:p-8 flex items-center justify-between gap-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link href={"/"}>
        <h1 className={`${fugaz.className} text-2xl sm:text-4xl textGradient`}>
          Moodly
        </h1>
      </Link>
      <Logout />
    </motion.header>
  );
}
