import React from 'react';
import MyRecipes from '../my-recipes/MyRecipes';
import RecipeForm from '../my-recipes/RecipeForm';
import RecipeFilter from '../my-recipes/RecipeFilter';

const MyRecipesRoot = () => {
  return (
    <div className='grid-2'>
      <div id='recipe-form'>
        <RecipeForm />
      </div>
      <div id='my-recipes'>
        <RecipeFilter />
        <MyRecipes />
      </div>
    </div>
  );
};

export default MyRecipesRoot;
