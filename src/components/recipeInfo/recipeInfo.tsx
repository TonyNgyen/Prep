import React from 'react'

type Nutrition = {
  [key: string]: number | { amount: number; unit: string };
};

type Ingredient = {
  id: string;
  name: string;
  nutrition: Nutrition;
  servingSize?: number;
  servingUnit?: string;
  servingsPerContainer?: number;
  pricePerContainer?: number;
  howManyTimesUsed?: number;
  createdAt: Date;
};

type IngredientsList = {
  [key: string]: Ingredient;
};

type Recipe = {
  id: string;
  name: string;
  nutrition: Nutrition;
  ingredientsList: IngredientsList
  howManyServings: number;
  pricePerServing?: number;
  howManyTimesUsed?: number;
};

type RecipeInfoProps = {
  recipe: Recipe;
}

function RecipeInfo({recipe} : RecipeInfoProps) {
  return (
    <div>RecipeInfo</div>
  )
}

export default RecipeInfo