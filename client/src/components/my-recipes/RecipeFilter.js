import React from 'react';
import {
  useRecipes,
  setFilter,
  clearFilter,
} from '../../context/my-recipes/RecipesState';

const RecipeFilter = () => {
  const recipesDispatch = useRecipes()[1];

  const onChange = e => {
    if (e.target.value !== '') {
      setFilter(recipesDispatch, e.target.value); // or text.current.value
    } else {
      clearFilter(recipesDispatch);
    }
  };

  return (
    <form>
      <input type='text' placeholder='Filter Recipes...' onChange={onChange} />
    </form>
  );
};

export default RecipeFilter;
