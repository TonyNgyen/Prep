"use client";

import { setWeightHistory } from "@/lib/data";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface FormDataType {
  day: number;
  month: number;
  year: number;
  weight: number;
}

function AddWeightForm() {
  const [formData, setFormData] = useState<FormDataType>({
    day: 1,
    month: 1,
    year: new Date().getFullYear(),
    weight: 0,
  });
  const router = useRouter();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "weight"
          ? parseFloat(value) || 0
          : name === "year"
          ? Math.min(
              Math.max(parseInt(value) || 1900, 1900),
              new Date().getFullYear()
            )
          : parseInt(value) || 0,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const { day, month, year, weight } = formData;
    const currentDate = new Date();
    const selectedDate = new Date(year, month - 1, day);

    if (year < 1900 || year > currentDate.getFullYear()) {
      newErrors.year = "Enter a valid year.";
    }

    if (month < 1 || month > 12) {
      newErrors.month = "Enter a valid month (1-12).";
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      newErrors.day = `Enter a valid day (1-${daysInMonth}).`;
    }

    if (selectedDate > currentDate) {
      newErrors.day = "Date cannot be in the future.";
    }

    if (weight <= 0) {
      newErrors.weight = "Weight must be greater than 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formattedDate = `${String(formData.year).slice(-2)}-${String(
      formData.month
    ).padStart(2, "0")}-${String(formData.day).padStart(2, "0")}`;

    try {
      await setWeightHistory(formattedDate, formData.weight);
      console.log("Weight history updated successfully");
      router.push("/");
    } catch (error) {
      console.error("Error updating weight history:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block font-semibold">Date</label>
      <div className="flex gap-2">
        <div className="flex flex-col w-1/3">
          <label htmlFor="day" className="text-sm font-medium text-gray-700">
            Day
          </label>
          <input
            id="day"
            type="number"
            name="day"
            placeholder="DD"
            value={formData.day}
            onChange={handleChange}
            className="border rounded-md p-2 border-gray-300"
            min="1"
            max="31"
            required
          />
          {errors.day && <p className="text-red-500 text-sm">{errors.day}</p>}
        </div>

        <div className="flex flex-col w-1/3">
          <label htmlFor="month" className="text-sm font-medium text-gray-700">
            Month
          </label>
          <input
            id="month"
            type="number"
            name="month"
            placeholder="MM"
            value={formData.month}
            onChange={handleChange}
            className="border rounded-md p-2 border-gray-300"
            min="1"
            max="12"
            required
          />
          {errors.month && (
            <p className="text-red-500 text-sm">{errors.month}</p>
          )}
        </div>

        <div className="flex flex-col w-1/3">
          <label htmlFor="year" className="text-sm font-medium text-gray-700">
            Year
          </label>
          <input
            id="year"
            type="number"
            name="year"
            placeholder="YYYY"
            value={formData.year}
            onChange={handleChange}
            className="border rounded-md p-2 border-gray-300"
            min="1900"
            max={new Date().getFullYear()}
            minLength={4}
            maxLength={4}
            required
          />

          {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
        </div>
      </div>

      <label className="block font-semibold">Weight</label>
      <input
        type="number"
        name="weight"
        step="0.01"
        min="0"
        value={formData.weight}
        onChange={handleChange}
        placeholder="Enter weight"
        className="border rounded-md w-1/3 p-2 border-gray-800"
        required
      />
      {errors.weight && <p className="text-red-500 text-sm">{errors.weight}</p>}

      <button
        type="submit"
        className="bg-gray-800 text-white font-semibold px-4 py-2 rounded-md shadow-md w-full"
      >
        Submit
      </button>
    </form>
  );
}

export default AddWeightForm;
