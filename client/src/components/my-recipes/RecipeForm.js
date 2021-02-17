import React, { useState, useEffect, Fragment } from 'react';
import {
  useRecipes,
  addRecipe,
  clearCurrent,
  updateRecipe,
} from '../../context/my-recipes/RecipesState';
import axios from 'axios';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const RecipeForm = () => {
  const [recipesState, recipesDispatch] = useRecipes();

  const { current } = recipesState;

  const defaultImgUrl =
    'https://res.cloudinary.com/falco-felipe27/image/upload/v1613529260/hnyonilaojqx1zjisski.jpg';

  const [uploading, setUploading] = useState(false);
  const [recipe, setRecipe] = useState({
    title: '',
    imageUrl: defaultImgUrl,
    icons: [],
    servings: 0,
    readyInMinutes: 0,
    healthScore: 0,
    dishTypes: '',
    cuisines: '',
    diets: '',
    ingredients: [],
    instructions: [],
    fromSpoon: false,
    spoonId: null,
  });

  useEffect(() => {
    if (current !== null) {
      setRecipe(current);
    } else {
      setRecipe({
        title: '',
        imageUrl: defaultImgUrl,
        icons: [],
        servings: 0,
        readyInMinutes: 0,
        healthScore: 0,
        dishTypes: '',
        cuisines: '',
        diets: '',
        ingredients: [],
        instructions: [],
        fromSpoon: false,
        spoonId: null,
      });
    }
  }, [current]);

  useEffect(() => {});

  const {
    title,
    imageUrl,
    icons,
    servings,
    readyInMinutes,
    healthScore,
    dishTypes,
    cuisines,
    diets,
    ingredients,
    ingredientItem,
    instructions,
    instructionStep,
    fromSpoon,
    spoonId,
  } = recipe;

  const onChange = e => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const toggleEdit = e => {
    e.target.parentElement.parentElement.nextElementSibling.classList.toggle(
      'd-none'
    );
    e.target.parentElement.parentElement.classList.toggle('d-none');
  };

  const toggleImgEdit = e => {
    e.target.nextElementSibling.classList.toggle('d-none');
    e.target.classList.toggle('d-none');
  };

  const toggleShow = e => {
    e.target.previousElementSibling.classList.toggle('d-none');
    e.target.classList.toggle('d-none');
  };

  const uploadImage = async formData => {
    const uploadedImage = await axios.post('/api/upload', formData);
    setUploading(false);
    return uploadedImage.data;
  };

  const onFileUpload = e => {
    const files = Array.from(e.target.files);
    setUploading(true);

    const formData = new FormData();
    files.forEach((file, i) => formData.append(i, file));

    uploadImage(formData).then(img => {
      setRecipe({
        ...recipe,
        imageUrl: img.url,
      });
      toggleShow(e);
    });
  };

  const onAddIngredient = e => {
    setRecipe({
      ...recipe,
      ingredients: [...ingredients, ingredientItem],
      ingredientItem: '',
    });
  };

  const onDeleteIngredient = e => {
    ingredients.splice(parseInt(e.target.parentElement.name), 1);
  };

  const onAddInstruction = e => {
    setRecipe({
      ...recipe,
      instructions: [...instructions, instructionStep],
      instructionStep: '',
    });
  };

  const onDeleteInstruction = e => {
    instructions.splice(parseInt(e.target.parentElement.name), 1);
  };

  const prepareRecipeToSend = recipe => {};

  const onSubmit = e => {
    e.preventDefault();

    console.log('Form sent');
    // const recipePrepared = prepareRecipeToSend(recipe);
    // if (current === null) {
    //   addRecipe(recipesDispatch, recipe);
    // } else {
    //   updateRecipe(recipesDispatch, recipe);
    // }
    // clearAll();
  };

  const clearAll = () => {
    clearCurrent(recipesDispatch);
  };

  return (
    <Fragment>
      <h2 className='text-primary text-center'>
        {current === null ? 'Add Recipe' : 'Edit Recipe'}
      </h2>
      <Card className='bg-light px-4 pt-2 mt-4'>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col
              id='recipe-form-details'
              className='recipe-details text-center bg-primary text-light py-3 primary-inputs'
              xs={12}
              md={5}
              xl={4}>
              <Row>
                <Col className='recipe-img'>
                  <img
                    src={imageUrl}
                    alt={`Photo of the recipe ${title}`}
                    style={{ maxWidth: '100%' }}
                  />
                  <Form.Group>
                    <Button
                      variant='dark'
                      name='image'
                      onClick={toggleImgEdit}
                      className='mt-1'>
                      {imageUrl !== defaultImgUrl
                        ? 'Update the image'
                        : 'Upload an image'}
                    </Button>
                    <Form.Control
                      type='file'
                      name='image'
                      onChange={onFileUpload}
                      className='d-none'
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} sm={7} md={12}>
                  <div className='recipe-main mb-2'>
                    <div className='recipe-title'>
                      <h3 name='title mt-1 text-light'>
                        {title || 'Insert Title'}
                        <a
                          href='#!'
                          onClick={toggleEdit}
                          className='ml-2 edit-icon'>
                          <i className='fas fa-pencil-alt text-dark' />
                        </a>
                      </h3>
                      <Form.Control
                        type='text'
                        placeholder='Recipe Title'
                        name='title'
                        value={title}
                        onChange={onChange}
                        onBlur={toggleShow}
                        className='discrete-input d-none'
                      />
                    </div>
                  </div>
                  <hr className='border-light w-75' />
                  <div className='text-center mb-3'>
                    <div className='servings'>
                      <strong className='d-inline'>Servings: </strong>
                      <span>
                        {servings}
                        <a
                          href='#!'
                          onClick={toggleEdit}
                          className='ml-2 edit-icon'>
                          <i className='fas fa-pencil-alt text-dark' />
                        </a>
                      </span>
                      <Form.Control
                        type='number'
                        placeholder='Servings'
                        name='servings'
                        value={servings}
                        onChange={onChange}
                        onBlur={toggleShow}
                        className='discrete-input d-none'
                      />
                    </div>
                    <div className='ready-in'>
                      <strong className='d-inline'>Ready In: </strong>
                      <span>
                        {readyInMinutes}min
                        <a
                          href='#!'
                          onClick={toggleEdit}
                          className='ml-2 edit-icon'>
                          <i className='fas fa-pencil-alt text-dark' />
                        </a>
                      </span>
                      <Form.Control
                        type='number'
                        placeholder='Ready in... (minutes)'
                        name='readyInMinutes'
                        value={readyInMinutes}
                        onChange={onChange}
                        onBlur={toggleShow}
                        className='discrete-input d-none'
                      />
                    </div>
                    <div className='healthScore'>
                      <strong className='d-inline'>Health Score: </strong>
                      <span>
                        {healthScore}
                        <a
                          href='#!'
                          onClick={toggleEdit}
                          className='ml-2 edit-icon'>
                          <i className='fas fa-pencil-alt text-dark' />
                        </a>
                      </span>
                      <Form.Control
                        type='number'
                        placeholder='Health Score (roughly)'
                        name='healthScore'
                        value={healthScore}
                        onChange={onChange}
                        onBlur={toggleShow}
                        className='discrete-input d-none'
                      />
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
                      <span>
                        {dishTypes || 'Not Specified'}
                        <a
                          href='#!'
                          onClick={toggleEdit}
                          className='ml-2 edit-icon'>
                          <i className='fas fa-pencil-alt text-dark' />
                        </a>
                      </span>
                      <Form.Control
                        type='text'
                        placeholder='Dish Type(s)'
                        name='dishTypes'
                        value={dishTypes}
                        onChange={onChange}
                        onBlur={toggleShow}
                        className='discrete-input d-none'
                      />
                    </div>
                    <div className='cuisine'>
                      <strong>Cuisines: </strong>
                      <span>
                        {cuisines || 'Generic'}
                        <a
                          href='#!'
                          onClick={toggleEdit}
                          className='ml-2 edit-icon'>
                          <i className='fas fa-pencil-alt text-dark' />
                        </a>
                      </span>
                      <Form.Control
                        type='text'
                        placeholder='Cuisine(s)'
                        name='cuisines'
                        value={cuisines}
                        onChange={onChange}
                        onBlur={toggleShow}
                        className='discrete-input d-none'
                      />
                    </div>
                    <div className='diets'>
                      <strong>Diets: </strong>
                      <span>
                        {diets || 'None'}
                        <a
                          href='#!'
                          onClick={toggleEdit}
                          className='ml-2 edit-icon'>
                          <i className='fas fa-pencil-alt text-dark' />
                        </a>
                      </span>
                      <Form.Control
                        type='text'
                        placeholder='Diet(s)'
                        name='diets'
                        value={diets}
                        onChange={onChange}
                        onBlur={toggleShow}
                        className='discrete-input d-none'
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col id='recipe-how-to' className='recipe-how-to py-3 pl-4'>
              <div className='recipe-howto-form'>
                <h4 className='text-primary recipe-header'>Ingredients</h4>
                <ul className='mt-2'>
                  {ingredients.length > 0
                    ? ingredients.map((ingredient, idx) => (
                        <li key={idx}>
                          <span>{ingredient}</span>
                          <span>
                            <a
                              href='#!'
                              onClick={toggleEdit}
                              className='edit-icon ml-5'>
                              <i className='fas fa-pencil-alt text-dark' />
                            </a>
                            <a
                              href='#!'
                              name={idx}
                              onClick={onDeleteIngredient}
                              className='edit-icon pull-right'>
                              <i className='fas fa-times text-danger' />
                            </a>{' '}
                          </span>
                        </li>
                      ))
                    : null}
                  <li>
                    <Form.Group>
                      <Form.Control
                        type='text'
                        placeholder='Ingredient'
                        name='ingredientItem'
                        value={ingredientItem}
                        onChange={onChange}
                      />
                      <Button onClick={onAddIngredient}>
                        <i className='fas fa-plus' /> Add
                      </Button>
                    </Form.Group>
                  </li>
                </ul>
              </div>
              <div className='recipe-howto-form'>
                <h4 className='text-primary recipe-header'>Instructions</h4>
                <ol className='mt-2'>
                  {instructions.length > 0
                    ? instructions.map((instruction, idx) => (
                        <li key={idx}>
                          <span>{instruction}</span>
                          <span>
                            <a
                              href='#!'
                              onClick={toggleEdit}
                              className='edit-icon ml-5'>
                              <i className='fas fa-pencil-alt text-dark' />
                            </a>
                            <a
                              href='#!'
                              name={idx}
                              onClick={onDeleteInstruction}
                              className='edit-icon pull-right'>
                              <i className='fas fa-times text-danger' />
                            </a>{' '}
                          </span>
                        </li>
                      ))
                    : null}
                  <li>
                    <Form.Group>
                      <Form.Control
                        type='text'
                        placeholder='Instruction'
                        name='instructionStep'
                        value={instructionStep}
                        onChange={onChange}
                      />
                      <Button onClick={onAddInstruction}>
                        <i className='fas fa-plus' /> Add
                      </Button>
                    </Form.Group>
                  </li>
                </ol>
              </div>
            </Col>
          </Row>
          <div>
            <Form.Control
              type='submit'
              value={current === null ? 'Add Recipe' : 'Update Recipe'}
              className='btn btn-primary btn-block'
            />
          </div>
          {current ? (
            <div>
              <button className='btn btn-light btn-block' onClick={clearAll}>
                Clear
              </button>
            </div>
          ) : null}
        </Form>
      </Card>
    </Fragment>
  );
};

export default RecipeForm;
