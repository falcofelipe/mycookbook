import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import Search from '../spoon-recipes/Search.js';
import SpoonRecipes from '../spoon-recipes/SpoonRecipes.js';

const SearchSpoon = () => {
	const location = useLocation();

	return (
		<Fragment>
			<Search />
			<SpoonRecipes location={location} />
		</Fragment>
	);
};

export default SearchSpoon;
