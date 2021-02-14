import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SpoonRecipe = ({
  location: {
    state: { recipe, fromLink },
  },
}) => {
  const {
    analyzedInstructions,
    cheap,
    creditsText,
    cuisines,
    dairyFree,
    diets,
    dishTypes,
    extendedIngredients,
    glutenFree,
    healthScore,
    id,
    image,
    nutrition,
    readyInMinutes,
    servings,
    sourceUrl,
    title,
    vegan,
    vegetarian,
    veryHealthy,
  } = recipe;

  const ingredientsLength = extendedIngredients.length;
  const instructionsLength = analyzedInstructions.length;

  const recipeIcons = (
    <div className='icons'>
      <i className='fas fa-leaf'></i> <i className='fas fa-leaf text-dark'></i>
    </div>
  );

  console.log(recipe);

  return (
    <Fragment>
      <Card bg='light' className='px-3 pt-0 mt-3'>
        <Row>
          <Col
            id='recipe-details'
            className='recipe-details text-center bg-primary text-light py-3'
            xs={5}
            xl={4}>
            <div className='recipe-main mb-2'>
              <img
                src={image}
                alt={`Photo of the recipe ${title}`}
                style={{ maxWidth: '100%' }}
              />
              <h3 className='mt-1 text-light'>{title}</h3>
              {recipeIcons}
            </div>
            <div className='recipe-stats mb-3 mx-3'>
              <div className='servings'>
                <p>
                  <strong>Servings:</strong>
                </p>
                <p>{servings}</p>
              </div>
              <div className='ready-in'>
                <p>
                  <strong>Ready in:</strong>
                </p>
                <p>{readyInMinutes}min</p>
              </div>
              <div className='healthScore'>
                <p>
                  <strong>Health Score:</strong>
                </p>
                <p>{healthScore}</p>
              </div>
            </div>
            <div className='recipe-secondary mb-4 text-center mx-2'>
              <div className='dish-types mb-1'>
                <strong>Dish Types:</strong> {dishTypes.join(', ')}
              </div>
              <div className='cuisine mb-1'>
                <strong>Cuisines: </strong>
                {cuisines.length > 0 ? cuisines.join(', ') : 'Generic'}
              </div>
              <div className='diets mb-1'>
                <strong>Diets:</strong>{' '}
                {diets.length > 0 ? diets.join(', ') : 'None'}
              </div>
            </div>
            <Link to={fromLink} className='btn btn-light w-75 mx-auto'>
              Back to Search
            </Link>
          </Col>

          <Col id='recipe-how-to' className='recipe-how-to py-3 pl-4'>
            <div className='recipe-ingredients'>
              <h4 className='text-primary'>Ingredients</h4>
              <ul className='mt-2'>
                <Col>
                  {extendedIngredients.map((ingredient, idx) =>
                    idx <= Math.floor(ingredientsLength / 2) ? (
                      <li key={idx}>{ingredient.original}</li>
                    ) : null
                  )}
                </Col>
                <Col>
                  {extendedIngredients.map((ingredient, idx) =>
                    idx > Math.floor(ingredientsLength / 2) ? (
                      <li key={idx}>{ingredient.original}</li>
                    ) : null
                  )}
                </Col>
              </ul>
            </div>

            {instructionsLength === 0 ? null : (
              <div className='recipe-instructions'>
                <h4 className='text-primary'>Instructions</h4>
                <ul className='mt-2'>
                  {analyzedInstructions[0].steps.map(step => (
                    <li key={step.number}>{step.step}</li>
                  ))}
                </ul>
              </div>
            )}
          </Col>
        </Row>
      </Card>
      <br />
    </Fragment>
  );
};

export default SpoonRecipe;
