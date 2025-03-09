"use client";

import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Page1 from "./page1/page1";
import Page2 from "./page2/page2";
import Page3 from "./page3/page3";

type formProp = {
  setShowAddForm?: React.Dispatch<React.SetStateAction<boolean>>; // Now optional
  isForm: boolean;
};

function AddInventoryForm({ setShowAddForm, isForm }: formProp) {
  const [pageNumber, setPageNumber] = useState(1);
  const [addType, setAddType] = useState<string | null>("");
  useEffect(() => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  }, [addType]);
  return (
    <div className="p-6 pb-[4rem] flex flex-col relative h-[calc(100vh-5rem)] gap-3">
      <div className="flex justify-between mb-3 items-center">
        <h1 className="text-3xl font-bold">Add to Inventory</h1>
        {isForm && setShowAddForm && (
          <button onClick={() => setShowAddForm(false)} className="flex2">
            <IoIosClose className="text-5xl flex" />
          </button>
        )}
      </div>

      <div className="overflow-scroll pb-6">
        {pageNumber == 1 && <Page1 setAddType={setAddType} />}
        {pageNumber == 2 && <Page2 addType={addType} />}
        {pageNumber == 3 && <Page3 />}
      </div>

      <div className="w-full flex justify-between absolute bottom-0 left-0 px-6 py-3 h-16">
        {pageNumber != 1 ? (
          <button
            type="button"
            className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
            onClick={() =>
              setPageNumber((prevPageNumber) => prevPageNumber - 1)
            }
          >
            Previous
          </button>
        ) : (
          <div></div>
        )}
        {pageNumber != 3 ? (
          <button
            type="button"
            className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
            onClick={() =>
              setPageNumber((prevPageNumber) => prevPageNumber + 1)
            }
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="bg-mainGreen text-white font-semibold rounded-md px-4 py-2"
            // onClick={() => handleSubmit()}
          >
            Add Recipe
          </button>
        )}
      </div>
    </div>
  );
}

export default AddInventoryForm;
