import React from 'react';
import SpoonRecipesItem from './SpoonRecipesItem.js';
import Spinner from '../layout/Spinner';
import { useSpoon } from '../../context/spoon/SpoonState';

const SpoonRecipes = props => {
  const spoonState = useSpoon()[0];

  const { recipes, loading } = spoonState;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className='recipe-grid'>
        {recipes.map(recipe => (
          <SpoonRecipesItem
            recipe={recipe}
            key={recipe.id}
            location={props.location}
          />
        ))}
      </div>
    );
  }
};

export default SpoonRecipes;
