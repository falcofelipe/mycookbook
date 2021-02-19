import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
  useRecipes,
  setCurrent,
  deleteRecipe,
} from '../../context/my-recipes/RecipesState';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const SpoonRecipe = ({
  location: {
    state: { recipe, fromLink },
  },
  history,
}) => {
  const recipesDispatch = useRecipes()[1];

  const {
    instructions,
    cuisines,
    diets,
    dishTypes,
    ingredients,
    healthScore,
    _id,
    imageUrl,
    readyInMinutes,
    servings,
    title,
  } = recipe;

  const onEditRecipe = () => {
    setCurrent(recipesDispatch, recipe);
  };

  const onDeleteRecipe = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this recipe?'
    );
    if (confirmed) {
      deleteRecipe(recipesDispatch, _id);
      history.push(fromLink);
    }
  };

  return (
    <Fragment>
      <Row className='action-btns mt-3'>
        <Col xs={5} xl={4} className='text-left ml-0'>
          <Button as={Link} to={fromLink} className='btn btn-light backBtn'>
            <i className='fas fa-arrow-left pr-1' /> Return
          </Button>
        </Col>
        <Col className='text-right mr-0 btn-col'>
          <Button
            as={Link}
            to={'/recipes/form'}
            onClick={onEditRecipe}
            className='btn btn-primary recipe-btn d-inline-block'>
            <i className='fas fa-pencil-alt pr-1' /> Edit{' '}
            <span className='d-none d-sm-inline'>Recipe</span>
          </Button>
          <Button
            onClick={onDeleteRecipe}
            className='btn btn-danger recipe-btn d-inline-block'>
            <i className='fas fa-times pr-1' /> Delete{' '}
            <span className='d-none d-sm-inline'>Recipe</span>
          </Button>
        </Col>
      </Row>
      <Card bg='light' className='px-3 pt-0 mt-1' id={`spoon-recipe-${_id}`}>
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
                  src={imageUrl}
                  alt={`${title}`}
                  style={{ maxWidth: '100%' }}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={7} md={12}>
                <div className='recipe-main mb-2'>
                  <h3 className='mt-1 text-light'>{title}</h3>
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
                    {dishTypes.length > 0 || dishTypes[0] === ''
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
                {ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>
            </div>

            {instructions.length === 0 ? null : (
              <div className='recipe-instructions'>
                <h4 className='text-primary recipe-header'>Instructions</h4>
                <ol className='mt-2'>
                  {instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
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
