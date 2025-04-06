"use client";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type DatePickerProps = {
  dates: string[];
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
};

function getCurrentDateFormatted() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateForDisplay(dateStr: string) {
  const formatLocalYMD = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = new Date();
  const todayStr = formatLocalYMD(today);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatLocalYMD(yesterday);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatLocalYMD(tomorrow);

  if (dateStr === todayStr) return "Today";
  if (dateStr === yesterdayStr) return "Yesterday";
  if (dateStr === tomorrowStr) return "Tomorrow";

  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function DatePicker({ dates, date, setDate }: DatePickerProps) {
  const [dropdown, setDropdown] = useState(false);

  const adjustDate = (days: number) => {
    const [year, month, day] = date.split("-").map(Number);
    const newDate = new Date(year, month - 1, day);
    newDate.setDate(newDate.getDate() + days);
    const newYear = newDate.getFullYear();
    const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");
    const newDay = String(newDate.getDate()).padStart(2, "0");
    setDate(`${newYear}-${newMonth}-${newDay}`);
  };

  return (
    <div className="flex items-center gap-10 justify-center">
      <IoIosArrowBack
        onClick={() => adjustDate(-1)}
        className="cursor-pointer"
      />
      <div className="relative flex justify-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setDropdown(!dropdown)}
        >
          <h1 className="text-2xl font-bold">{formatDateForDisplay(date)}</h1>
        </div>
      </div>
      <IoIosArrowForward
        onClick={() => adjustDate(1)}
        className="cursor-pointer"
      />
    </div>
  );
}

export default DatePicker;
