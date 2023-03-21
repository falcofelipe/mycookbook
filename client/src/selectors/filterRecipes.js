const filterRecipes = (recipes, filter) => {
  const filteredRecipes = recipes.filter(recipe => {
    const lcFilter = filter.toLowerCase();
    const title = recipe.title.toLowerCase();
    const dishTypes = recipe.dishTypes.join(',').toLowerCase();
    const cuisines = recipe.cuisines.join(',').toLowerCase();
    const diets = recipe.diets.join(',').toLowerCase();
    return (
      title.includes(lcFilter) ||
      dishTypes.includes(lcFilter) ||
      cuisines.includes(lcFilter) ||
      diets.includes(lcFilter)
    );
  });
  return filteredRecipes;
};

export default filterRecipes;
