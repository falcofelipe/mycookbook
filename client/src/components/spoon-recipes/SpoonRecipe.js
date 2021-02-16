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

  const showRecipeIcons = () => {
    const icons = getIcons();

    return (
      <div className='recipe-icons'>
        {Object.keys(icons).map((keyName, index) => (
          <div className='tooltip-container ml-1' key={index}>
            {icons[keyName].icon}
            <span className='tooltip-text'>{icons[keyName].title}</span>
          </div>
        ))}
      </div>
    );
  };

  const getIcons = () => {
    let iconsObject = {};

    if (cheap) {
      iconsObject.cheap = {
        icon: <i className='fas fa-dollar-sign recipe-icon' />,
        title: 'Cheap',
      };
    }
    if (dairyFree) {
      iconsObject.dairyFree = {
        icon: (
          <span className='fa-stack'>
            <i className='fas fa-ban fa-stack-2x recipe-icon' />
            <i className='fas fa-cheese fa-stack-1x recipe-icon' />
          </span>
        ),
        title: 'Dairy Free',
      };
    }
    if (glutenFree) {
      iconsObject.glutenFree = {
        icon: (
          <span className='fa-stack'>
            <i className='fas fa-ban fa-stack-2x recipe-icon' />
            <i className='fas fa-bread-slice fa-stack-1x  recipe-icon' />
          </span>
        ),
        title: 'Gluten Free',
      };
    }
    if (vegan) {
      iconsObject.vegan = {
        icon: <i className='fas fa-seedling recipe-icon' />,
        title: 'Vegan',
      };
    }
    if (vegetarian) {
      iconsObject.vegetarian = {
        icon: <i className='fas fa-leaf recipe-icon' />,
        title: 'Vegetarian',
      };
    }
    if (veryHealthy) {
      iconsObject.veryHealthy = {
        icon: <i className='fas fa-heart recipe-icon' />,
        title: 'Very Healthy',
      };
    }

    return iconsObject;
  };

  console.log(recipe);

  const onSaveRecipe = () => console.log('Recipe Saved!');

  return (
    <Fragment>
      <Row className='action-btns mt-3'>
        <Col xs={5} xl={4} className='text-left ml-0'>
          <Button as={Link} to={fromLink} className='btn btn-light backBtn'>
            <i className='fas fa-arrow-left pr-1' /> Return
          </Button>
        </Col>
        <Col className='text-right mr-0'>
          <Button
            onClick={onSaveRecipe}
            className='btn btn-primary save-recipe-btn'>
            <i className='fas fa-plus pr-1' /> Save Recipe
          </Button>
        </Col>
      </Row>
      <Card bg='light' className='px-3 pt-0 mt-1' id={`spoon-recipe-${id}`}>
        <Row>
          <Col
            id='recipe-details'
            className='recipe-details text-center bg-primary text-light py-3'
            xs={12}
            md={5}
            xl={4}>
            <Row>
              <Col className='recipe-img'>
                <img
                  src={image}
                  alt={`Photo of the recipe ${title}`}
                  style={{ maxWidth: '100%' }}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={7} md={12}>
                <div className='recipe-main mb-2'>
                  <h3 className='mt-1 text-light'>{title}</h3>
                  {showRecipeIcons()}
                </div>
                <hr className='border-light w-75' />
                <div className='recipe-stats mb-3'>
                  <div className='servings'>
                    <p>
                      <div className='tooltip-container d-inline-block d-lg-none mb-1'>
                        <i className='fas fa-user-friends text-dark'></i>
                        <span className='tooltip-text'>Servings</span>
                      </div>
                      <strong className='d-none d-lg-inline'>Servings:</strong>
                    </p>
                    <p>{servings}</p>
                  </div>
                  <div className='ready-in'>
                    <p>
                      <div className='tooltip-container d-inline-block d-lg-none mb-1'>
                        <i className='fas fa-clock text-dark' />
                        <span className='tooltip-text'>Ready in</span>
                      </div>
                      <strong className='d-none d-lg-inline'>Ready in:</strong>
                    </p>
                    <p>{readyInMinutes}min</p>
                  </div>
                  <div className='healthScore'>
                    <p>
                      <div className='tooltip-container d-inline-block d-lg-none mb-1'>
                        <i className='fas fa-weight text-dark' />
                        <span className='tooltip-text'>Health Score</span>
                      </div>
                      <strong className='d-none d-lg-inline'>
                        Health Score:
                      </strong>
                    </p>
                    <p>{healthScore}</p>
                  </div>
                </div>
              </Col>
              <Col
                xs={12}
                sm={5}
                md={12}
                className='d-flex flex-column justify-content-middle'>
                <div className='recipe-secondary text-center mx-2'>
                  <div className='dish-types'>
                    <strong>Dish Types: </strong>
                    {dishTypes.length > 0
                      ? dishTypes.join(', ')
                      : 'Not Specified'}
                  </div>
                  <div className='cuisine'>
                    <strong>Cuisines: </strong>
                    {cuisines.length > 0 ? cuisines.join(', ') : 'Generic'}
                  </div>
                  <div className='diets'>
                    <strong>Diets: </strong>
                    {diets.length > 0 ? diets.join(', ') : 'None'}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          <Col id='recipe-how-to' className='recipe-how-to py-3 pl-4'>
            <div className='recipe-ingredients'>
              <h4 className='text-primary recipe-header'>Ingredients</h4>
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
                <h4 className='text-primary recipe-header'>Instructions</h4>
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
