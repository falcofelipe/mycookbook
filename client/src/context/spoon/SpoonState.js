import React, { useContext, useReducer } from 'react';
import SpoonContext from './spoonContext';
import spoonReducer from './spoonReducer';
import {
  SEARCH_SPOON,
  GET_SPOON,
  CLEAR_SPOON,
  SPOON_ERROR,
  SET_LOADING,
} from '../types';
import axios from 'axios';

export const useSpoon = () => {
  const { state, dispatch } = useContext(SpoonContext);
  return [state, dispatch];
};

/* ---------------------------- HEADERS & PREP ------------------------ */

// apiKey Declaration & Adding
let spoonKey;
if (process.env.NODE_ENV !== 'production') {
  spoonKey = process.env.REACT_APP_SPOON_KEY;
} else {
  spoonKey = process.env.SPOON_KEY;
}
const addApiKey = parameters => {
  let params = { apiKey: spoonKey, ...parameters };
  return params;
};

const spoonacular = axios.create({
  baseURL: `https://api.spoonacular.com/recipes`,
});

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

/* ------------------------------- ACTIONS ---------------------------- */

// Search Recipes via Spoonacular API
export const searchSpoon = async (dispatch, parameters) => {
  setLoading(dispatch);
  try {
    const params = addApiKey(parameters);

    const response = await spoonacular.get('/complexSearch', {
      params,
    });

    dispatch({
      type: SEARCH_SPOON,
      payload: response.data.results,
    });
    // dispatch({
    //   type: SET_REMAINING_QUOTA,
    //   payload: response.headers
    // })
  } catch (err) {
    console.error(err);
    dispatch({
      type: SPOON_ERROR,
      payload: err.response.data,
    });
  }
};

// export const getUserAndRepos = async username => {
//   // This method returns as an array the results of an array of promises once all of them have been resolved.
//   const [user, repos] = await Promise.all([
//     github.get(`/users/${username}?`),
//     github.get(`/users/${username}/repos?per_page=5&sort=created:asc?`),
//   ]);
//   return { user: user.data, repos: repos.data };
// };

// export const getFirstUsers = async () => {
//   const firstUsers = await github.get('/users');
//   return firstUsers.data;
// };

export const clearSpoon = dispatch => dispatch({ type: CLEAR_SPOON });

const setLoading = dispatch => dispatch({ type: SET_LOADING });

/* -------------------------------- STATE ----------------------------- */

const SpoonState = props => {
  const initialState = {
    recipes: [],
    recipe: {},
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(spoonReducer, initialState);

  return (
    <SpoonContext.Provider
      value={{
        state: state,
        dispatch,
      }}>
      {props.children}
    </SpoonContext.Provider>
  );
};

export default SpoonState;
