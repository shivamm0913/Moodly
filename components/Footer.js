"use client";
import { motion } from "framer-motion";
import { Chicle } from "next/font/google";

const fugaz = Chicle({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Footer() {
  return (
    <motion.footer
      className="p-4 sm:p-8 grid place-items-center"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
    >
      <p className={`${fugaz.className} text-indigo-500 sm:text-2xl`}>
        Created with ❤️ by Shivam Kewat
      </p>
    </motion.footer>
  );
}
