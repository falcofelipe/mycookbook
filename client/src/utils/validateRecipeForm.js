export const validateRecipeForm = recipe => {
  if (
    (recipe.title === '',
    recipe.servings === 0,
    recipe.readyInMinutes === 0,
    recipe.ingredients.length === 0)
  ) {
    return false;
  }
  return true;
};
