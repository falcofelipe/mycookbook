import React, { Fragment } from 'react';
import Search from '../spoon-recipes/Search.js';
import SpoonRecipes from '../spoon-recipes/SpoonRecipes.js';

const Home = props => {
  return (
    <Fragment>
      <Search />
      <SpoonRecipes location={props.location} />
    </Fragment>
  );
};

export default Home;
