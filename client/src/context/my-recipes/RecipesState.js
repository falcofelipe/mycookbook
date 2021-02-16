import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import RecipesContext from './recipesContext';
import recipesReducer from './recipesReducer';
import {
  GET_RECIPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  UPDATE_RECIPE,
  CLEAR_RECIPES,
  SET_CURRENT,
  CLEAR_CURRENT,
  RECIPE_ERROR,
  SET_FILTER,
  CLEAR_FILTER,
} from '../types';

export const useRecipes = () => {
  const { state, dispatch } = useContext(RecipesContext);
  return [state, dispatch];
};

/*--------------- ACTIONS --------------------*/

// Axios Configuration
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

// Get Recipes
export const getRecipes = async dispatch => {
  try {
    const res = await axios.get('/api/recipes');

    dispatch({ type: GET_RECIPES, payload: res.data });
  } catch (err) {
    console.error(err);
    dispatch({ type: RECIPE_ERROR, payload: err.response.data.msg });
  }
};

// Add Recipe
export const addRecipe = async (dispatch, recipe) => {
  try {
    const res = await axios.post('/api/recipes', recipe, config);

    dispatch({ type: ADD_RECIPE, payload: res.data });
  } catch (err) {
    dispatch({ type: RECIPE_ERROR, payload: err.response.data.msg });
  }
};

// Delete Recipe
export const deleteRecipe = async (dispatch, id) => {
  try {
    await axios.delete(`/api/recipes/${id}`);

    dispatch({ type: DELETE_RECIPE, payload: id });
  } catch (err) {
    dispatch({ type: RECIPE_ERROR, payload: err.response.data.msg });
  }
};

// Update Recipe
export const updateRecipe = async (dispatch, recipe) => {
  try {
    const res = await axios.put(`/api/recipes/${recipe._id}`, recipe, config);

    dispatch({ type: UPDATE_RECIPE, payload: res.data });
  } catch (err) {
    dispatch({ type: RECIPE_ERROR, payload: err.response.data.msg });
  }
};

// Clear Recipes
export const clearRecipes = async dispatch => dispatch({ type: CLEAR_RECIPES });

// Set Current Recipe
export const setCurrent = (dispatch, recipe) => {
  dispatch({ type: SET_CURRENT, payload: recipe });
};

// Clear Current Recipe
export const clearCurrent = dispatch => {
  dispatch({ type: CLEAR_CURRENT });
};

// Filter Recipes
export const setFilter = (dispatch, text) => {
  dispatch({ type: SET_FILTER, payload: text });
};

// Clear Filter
export const clearFilter = dispatch => {
  dispatch({ type: CLEAR_FILTER });
};

/*---------------- STATE -----------------*/

const RecipesState = props => {
  const initialState = {
    recipes: null,
    current: null,
    filter: '',
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(recipesReducer, initialState);

  return (
    <RecipesContext.Provider
      value={{
        state: state,
        dispatch,
      }}>
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesState;
