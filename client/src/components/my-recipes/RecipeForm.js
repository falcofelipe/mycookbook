import React, { useState, useEffect } from 'react';
import {
  useRecipes,
  addRecipe,
  clearCurrent,
  updateRecipe,
} from '../../context/my-recipes/RecipesState';

const RecipeForm = () => {
  const [recipesState, recipesDispatch] = useRecipes();

  const { current } = recipesState;

  const [recipe, setRecipe] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  useEffect(() => {
    if (current !== null) {
      setRecipe(current);
    } else {
      setRecipe({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [current]);

  const { name, email, phone, type } = recipe;

  const onChange = e =>
    setRecipe({
      ...Recipe,
      [e.target.name]: e.target.value,
    });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addRecipe(recipesDispatch, recipe);
    } else {
      updateRecipe(recipesDispatch, recipe);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(recipesDispatch);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current === null ? 'Add Recipe' : 'Edit Recipe'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='E-mail'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Recipe Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{'   '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current === null ? 'Add Recipe' : 'Update Recipe'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current ? (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      ) : null}
    </form>
  );
};

export default RecipeForm;
