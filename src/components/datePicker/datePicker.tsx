"use client";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type DatePickerProps = {
  dates: string[];
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
};

function DatePicker({ dates, date, setDate }: DatePickerProps) {
  const today = new Date().toISOString().split("T")[0];
  const [dropdown, setDropdown] = useState(false);

  const adjustDate = (days: number) => {
    const [year, month, day] = date.split("-").map(Number);
    const newDate = new Date(year, month - 1, day);
    newDate.setDate(newDate.getDate() + days);

    const formattedDate = newDate.toISOString().split("T")[0];
    setDate(formattedDate);
  };

  return (
    <div className="flex items-center gap-10 justify-center">
      <IoIosArrowBack
        onClick={() => adjustDate(-1)} // Subtract one day
        className="cursor-pointer"
      />
      <div className="relative flex justify-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setDropdown(!dropdown)}
        >
          <h1 className="text-2xl font-bold">
            {date === today
              ? "Today"
              : date ===
                new Date(new Date().setDate(new Date().getDate() - 1))
                  .toISOString()
                  .split("T")[0]
              ? "Yesterday"
              : date ===
                new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split("T")[0]
              ? "Tomorrow"
              : new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
          </h1>

          {/* {dropdown ? (
            <IoMdArrowDropup className="text-2xl" />
          ) : (
            <IoMdArrowDropdown className="text-2xl" />
          )} */}
        </div>

        {/* {dropdown && (
          <div className="absolute left-1/2 translate-x-[-50%] top-full mt-1 w-40 bg-white shadow-md border rounded-md z-10">
            {dates.length > 0 ? (
              dates.map((d) => (
                <div
                  key={d}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setDate(d);
                    setDropdown(false);
                  }}
                >
                  {d === today ? "Today" : d}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No dates available</div>
            )}
          </div>
        )} */}
      </div>
      <IoIosArrowForward
        onClick={() => adjustDate(1)} // Add one day
        className="cursor-pointer"
      />
    </div>
  );
}

export default DatePicker;
