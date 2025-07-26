"use client";
import React, { useState } from "react";
import { gradients, baseRating } from "@/utils";
import { Chicle } from "next/font/google";

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);
const now = new Date();
const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const fugaz = Chicle({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Calendar(props) {
  const { demo, completeData, handleSetMood, moods } = props;

  function getEmoji(moodValue) {
    const moodKeys = Object.keys(moods);
    return moods[moodKeys[moodValue - 1]] || "";
  }

  const now = new Date();
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(
    Object.keys(months)[currMonth]
  );
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const numericMonth = monthsArr.indexOf(selectedMonth);

  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  function handleIncrementMonth(val) {
    //1+ ,1-
    //if we hit the bounds of the month , then we can  just adjust the year that is displayed instead
    if (numericMonth + val < 0) {
      // set the month value -11 and decrement the year
      setSelectedYear((curr) => curr - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      //set the month val = 0 and incremenet the year
      setSelectedYear((curr) => curr + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + val]);
    }
  }

  // const year = 2024
  // const month = "July"
  const monthNow = new Date(
    selectedYear,
    Object.keys(months).indexOf(selectedMonth),
    1
  );
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    selectedYear,
    Object.keys(selectedMonth).indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numsRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);
  return (
    <div className=" flex  flex-col gap-2">
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => {
            handleIncrementMonth(-1);
          }}
          className="mr-auto text-indigo-400 text-lg duration-200 hover:opacity-60 sm:text-xl"
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p
          className={`text-center capitalize text-xl sm:text-4xl  textGradient whitespace-nowrap  ${fugaz.className}`}
        >
          {selectedMonth},{selectedYear}
        </p>
        <button
          onClick={() => {
            handleIncrementMonth(+1);
          }}
          className="ml-auto text-indigo-400 text-lg duration-200 hover:opacity-60  sm:text-xl"
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6  md:py-10">
        {[...Array(numsRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="grid grid-cols-7 gap-1">
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                let dayIndex =
                  rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

                let dayDisplay =
                  dayIndex > daysInMonth
                    ? false
                    : row === 0 && dayOfWeekIndex < firstDayOfMonth
                    ? false
                    : true;

                let isToday = dayIndex === now.getDate();

                if (!dayDisplay) {
                  return <div key={dayOfWeekIndex} className="bg-white" />;
                }

                let color = demo
                  ? gradients.indigo[baseRating[dayIndex]]
                  : dayIndex in data
                  ? gradients.indigo[data[dayIndex]]
                  : "white";

                return (
                  <div
                    style={{ background: color }}
                    className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg  ${
                      isToday ? "border-indigo-400" : "border-indigo-100"
                    } ${color === "white" ? "text-indigo-400" : "text-white"}`}
                    key={dayOfWeekIndex}
                  >
                    <p>{dayIndex}</p>
                    {data[dayIndex] && (
                      <p className="">{getEmoji(data[dayIndex])}</p>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
