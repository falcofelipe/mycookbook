import React from 'react';
import PropTypes from 'prop-types';
import {
  useRecipes,
  deleteRecipe,
  setCurrent,
  clearCurrent,
} from '../../context/my-recipes/RecipesState';

const RecipeItem = ({ recipe }) => {
  const recipesDispatch = useRecipes()[1];

  const { _id, name, email, phone, type } = recipe;

  const onDelete = e => {
    deleteRecipe(recipesDispatch, _id);
    clearCurrent(recipesDispatch);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }>
          {/* Makes the first letter uppercase */}
          {type.charAt(0).toUpperCase() + type.slice(1)}{' '}
        </span>{' '}
      </h3>
      <ul className='list'>
        {email ? (
          <li>
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        ) : null}
        {phone ? (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        ) : null}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(recipesDispatch, recipe)}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeItem;
