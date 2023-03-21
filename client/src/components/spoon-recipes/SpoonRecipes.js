import React from 'react';
import { useLocation } from 'react-router-dom';
import SpoonRecipesItem from './SpoonRecipesItem.js';
import Spinner from '../layout/MySpinner';
import { useSpoon } from '../../context/spoon/SpoonState';

const SpoonRecipes = () => {
	const spoonState = useSpoon()[0];

	const { recipes, loading } = spoonState;

	const location = useLocation();

	if (loading) {
		return <Spinner />;
	} else {
		console.log(recipes);
		return (
			<div className='recipe-grid'>
				{recipes.map((recipe) => (
					<SpoonRecipesItem
						recipe={recipe}
						key={recipe.id}
						location={location}
					/>
				))}
			</div>
		);
	}
};

export default SpoonRecipes;
