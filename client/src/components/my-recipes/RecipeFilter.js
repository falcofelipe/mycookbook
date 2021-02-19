import React from 'react';
import {
  useRecipes,
  setFilter,
  clearFilter,
} from '../../context/my-recipes/RecipesState';

import Form from 'react-bootstrap/Form';

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
    <Form action='#!'>
      <Form.Control
        type='text'
        placeholder='Filter Recipes...'
        onChange={onChange}
        className='w-100 my-3'
      />
    </Form>
  );
};

export default RecipeFilter;
