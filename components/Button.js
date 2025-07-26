import { Chicle } from "next/font/google";
import React from "react";

const fugaz = Chicle({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Button(props) {
  const { text, dark, full, clickHandler } = props;
  return (
    <button
      onClick={clickHandler}
      className={`border-indigo-600 border-2 duration-200 hover:opacity-60 border-solid rounded-full  overflow-hidden ${
        dark ? "text-white bg-indigo-600 border-indigo-600" : "text-indigo-600"
      }
    ${full ? "grid place-itesm-center w-full " : ""}`}
    >
      <p
        className={`${fugaz.className} px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3`}
      >
        {text}
      </p>
    </button>
  );
}
