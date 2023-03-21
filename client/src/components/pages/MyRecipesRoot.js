import React from 'react';
import MyRecipes from '../my-recipes/MyRecipes';
import RecipeFilter from '../my-recipes/RecipeFilter';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const MyRecipesRoot = () => {
	return (
		<div id='my-recipes' className='mt-4'>
			<h1 className='text-light text-center'>My Recipes</h1>
			<Link
				to='/recipes/form'
				as={Button}
				var='primary'
				className='btn btn-primary btn-block text-center'>
				<i className='fas fa-plus'></i> Add New Recipe
			</Link>
			<RecipeFilter />
			<MyRecipes />
		</div>
	);
};

export default MyRecipesRoot;
