"use client";
import { Chicle } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Login from "./Login";
import Loading from "./Loading";

const fugaz = Chicle({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Dashboard() {
  const [data, setData] = useState({});
  const now = new Date();

  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();

  function countValues() {
    let total_num_of_days = 0;
    let sum_mood = 0;
    for (let year in data) {
      for (let month in data[year])
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day];
          total_num_of_days++;
          sum_mood += days_mood;
        }
    }
    return {
      nums_day: total_num_of_days,
      average_mood: sum_mood / total_num_of_days,
    };
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${24 - now.getHours()}H      ${60 - now.getMinutes()} M`,
  };

  async function handleSetMood(mood) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;
      //update  the current state
      setData(newData);
      //update the global state
      setUserDataObj(newData);
      //update firebase
      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (error) {
      console.log("Failed to set data", error);
    }
  }

  const moods = {
    "&*@#$": "😭",
    Sad: "🥲",
    Existing: "😶",
    Good: "😊",
    Elated: "😍",
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }
  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-1 flex-col gap-8 sm:gap-10 md:gap-16 ">
      <div className="grid  grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4 ">
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className=" flex flex-col gap-1 sm:gap-2">
              <p className="font-medium capitalize text-xs sm:text-sm   truncate">
                {status.replaceAll("_", " ")}
              </p>
              <p className={`${fugaz.className} text-base sm:text-lg truncate`}>
                {statuses[status]}
                {status === "nums_day" ? "🔥" : ""}
              </p>
            </div>
          );
        })}
      </div>

      <h4 className={`${fugaz.className} text-6xl sm:text-7xl md:text-8xl`}>
        How do you <span className="textGradient">feel </span>today?
      </h4>
      <div className="flex items-stretch flex-wrap gap-4">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              onClick={() => {
                const currMoodValue = moodIndex + 1;
                handleSetMood(currMoodValue);
              }}
              className={`flex-1 flex flex-col gap-2 items-center p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center `}
              key={moodIndex}
            >
              <p className="text-4xl sm:text-5xl md:text-6xl pb-6">
                {moods[mood]}
              </p>
              <p
                className={`${fugaz.className} text-indigo-500 text-xl sm:text-lg md:text-2xl   `}
              >
                {mood}
              </p>
            </button>
          );
        })}
      </div>

      <Calendar
        completeData={data}
        handleSetMood={handleSetMood}
        moods={moods}
      />
    </div>
  );
}
