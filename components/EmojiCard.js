import React from "react";

export default function (props) {
  const { text, emoji } = props;

  return (
    <div className="flex flex-col flex-1 ">
      <div className="flex flex-col p-4 bg-indigo-50">
        <p>{emoji}</p>
        <p>{text}</p>
      </div>
    </div>
  );
}
