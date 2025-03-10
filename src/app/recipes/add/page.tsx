"use client";

import AddRecipeForm from "@/components/dataForms/addRecipeForm/addRecipeForm";
import React, { useState } from "react";

function AddRecipesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  return (
      <AddRecipeForm setShowAddForm={setShowAddForm} isForm={false} />
  );
}

export default AddRecipesPage;
