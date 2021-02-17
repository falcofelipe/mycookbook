const filterRecipes = (recipes, filter) => {
  const filteredRecipes = recipes.filter(recipe => {
    const lcFilter = filter.toLowerCase();
    const name = recipe.name ? recipe.name.toLowerCase() : '';
    const email = recipe.email ? recipe.email.toLowerCase() : '';
    const phone = recipe.phone ? recipe.phone : '';
    return (
      name.includes(lcFilter) ||
      email.includes(lcFilter) ||
      phone.includes(lcFilter)
    );
  });
  return filteredRecipes;
};

export default filterRecipes;
