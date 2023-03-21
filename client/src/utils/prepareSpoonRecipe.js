import { capitalCaseArray } from './capitalCaseArray';

export const prepareSpoonRecipe = spoonRecipe => {
  let preparedRecipe = {
    cuisines: capitalCaseArray([...spoonRecipe.cuisines]),
    diets: capitalCaseArray([...spoonRecipe.diets]),
    dishTypes: capitalCaseArray([...spoonRecipe.dishTypes]),
    icons: [],
    healthScore: spoonRecipe.healthScore,
    readyInMinutes: spoonRecipe.readyInMinutes,
    servings: spoonRecipe.servings,
    title: spoonRecipe.title,
    imageUrl: spoonRecipe.image,
    spoonId: spoonRecipe.id,
    fromSpoon: true,
    ingredientItem: '',
    instructionStep: '',
  };

  preparedRecipe.instructions = spoonRecipe.analyzedInstructions[0].steps.map(
    instruction => instruction.step
  );
  preparedRecipe.ingredients = spoonRecipe.extendedIngredients.map(
    ingredient => ingredient.original
  );

  return preparedRecipe;
};
