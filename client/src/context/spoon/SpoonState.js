import React, { useContext, useReducer, useEffect } from 'react';
import SpoonContext from './spoonContext';
import spoonReducer from './spoonReducer';
import { SEARCH_SPOON, CLEAR_SPOON, SPOON_ERROR, SET_LOADING } from '../types';
import axios from 'axios';

export const useSpoon = () => {
	const { state, dispatch } = useContext(SpoonContext);
	return [state, dispatch];
};

/* ---------------------------- HEADERS & PREP ------------------------ */

// apiKey Declaration & Adding
let spoonKey;
axios.get('/api/spoon/key').then((key) => {
	spoonKey = key.data;
});

const addApiKey = (parameters) => {
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
	} catch (err) {
		console.error(err);
		dispatch({
			type: SPOON_ERROR,
			payload: err.response.data,
		});
	}
};

export const clearSpoon = (dispatch) => dispatch({ type: CLEAR_SPOON });

const setLoading = (dispatch) => dispatch({ type: SET_LOADING });

/* -------------------------------- STATE ----------------------------- */

const SpoonState = (props) => {
	const initialState = {
		recipes: [],
		recipe: {},
		loading: false,
		error: null,
	};

	const [state, dispatch] = useReducer(spoonReducer, initialState);

	// Sets the default headers of axios to allow API calls on production
	useEffect(() => {
		axios.defaults.headers.post['Access-Control-Allow-Methods'] =
			'PATCH, DELETE, POST, GET, OPTIONS';
	}, []);

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
