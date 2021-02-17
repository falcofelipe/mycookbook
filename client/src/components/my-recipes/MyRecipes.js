import React, { Fragment, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRecipes, getRecipes } from '../../context/my-recipes/RecipesState';
import RecipeItem from './RecipeItem';
import Spinner from '../layout/MySpinner';
import filterRecipes from '../../selectors/filterRecipes';

const MyRecipes = () => {
  const [recipesState, recipesDispatch] = useRecipes();

  const { recipes, filter, loading } = recipesState;

  useEffect(() => {
    getRecipes(recipesDispatch);
  }, [recipesDispatch]);

  let filteredRecipes;

  if (recipes !== null && !loading) {
    filteredRecipes = filterRecipes(recipes, filter);
  } else {
    filteredRecipes = recipes;
  }

  if (recipes !== null && recipes.length === 0 && !loading) {
    return <h4>Please add or save a recipe</h4>;
  }

  return (
    <Fragment>
      {recipes !== null && !loading ? (
        filter !== '' ? (
          <AnimatePresence>
            {filteredRecipes.map(recipe => (
              <motion.div
                layout
                key={recipe._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: 0.5 }}
                transition={{ delay: 0.2 }}>
                <RecipeItem recipe={recipe} />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            {recipes.map(recipe => (
              <motion.div
                layout
                key={recipe._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: 0.5 }}
                transition={{ delay: 0.2 }}>
                <RecipeItem recipe={recipe} />
              </motion.div>
            ))}
          </AnimatePresence>
        )
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default MyRecipes;
