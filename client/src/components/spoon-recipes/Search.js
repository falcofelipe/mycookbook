import React, { useState, Fragment } from 'react';
import {
  useSpoon,
  searchSpoon,
  clearSpoon,
} from '../../context/spoon/SpoonState';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const Search = () => {
  const [spoonState, spoonDispatch] = useSpoon();

  const { recipes } = spoonState;

  const initialState = {
    query: '',
    cuisine: '',
    diet: '',
    intolerances: '',
    includeIngredients: '',
    excludeIngredients: '',
    type: '',
    instructionsRequired: false,
    maxReadyTime: 0,
    offset: 0,
    number: 12,
    addRecipeNutrition: true,
    fillIngredients: true,
  };

  const [search, setSearch] = useState(initialState);
  const [show, setShow] = useState(false);

  const {
    query,
    cuisine,
    diet,
    intolerances,
    includeIngredients,
    excludeIngredients,
    type,
    instructionsRequired,
    maxReadyTime,
  } = search;

  const onClick = e => setShow(show ? false : true);

  const onChange = e =>
    setSearch({ ...search, [e.target.name]: e.target.value });

  const onCheck = e =>
    setSearch({ ...search, [e.target.name]: e.target.checked });

  const onSubmit = e => {
    e.preventDefault();
    let params = { ...search };
    if (params.maxReadyTime === 0) {
      delete params.maxReadyTime;
    }
    searchSpoon(spoonDispatch, params);
  };

  return (
    <div className='mt-3' id='search-form-div'>
      <Form onSubmit={onSubmit} id='search-form'>
        <Form.Row className='mb-2'>
          <Col lg={10} sm={8} xs={6}>
            <Form.Control
              type='text'
              name='query'
              placeholder='Search Recipes...'
              value={query}
              onChange={onChange}
            />
          </Col>
          <Col lg={2} sm={4} xs={6}>
            <Button variant='light' onClick={onClick} className='btn-block'>
              {!show ? (
                <Fragment>
                  <i className='fas fa-angle-down' /> More Options
                </Fragment>
              ) : (
                <Fragment>
                  <i className='fas fa-angle-up' /> Less Options
                </Fragment>
              )}
            </Button>
          </Col>
        </Form.Row>
        {!show ? null : (
          <Card id='extended-search-form' className='p-2 bg-light mb-2'>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label htmlFor='cuisine' className='px-1'>
                  Cuisine
                </Form.Label>
                <Form.Control
                  type='text'
                  name='cuisine'
                  value={cuisine}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label htmlFor='diet' className='px-1'>
                  Diet
                </Form.Label>
                <Form.Control
                  type='text'
                  name='diet'
                  value={diet}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label htmlFor='intolerances' className='px-1'>
                  Intolerances
                </Form.Label>
                <Form.Control
                  type='text'
                  name='intolerances'
                  value={intolerances}
                  onChange={onChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label htmlFor='includeIngredients' className='px-1'>
                  Include Ingredients...
                </Form.Label>
                <Form.Control
                  type='text'
                  name='includeIngredients'
                  value={includeIngredients}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label htmlFor='excludeIngredients' className='px-1'>
                  Exclude Ingredients...
                </Form.Label>
                <Form.Control
                  type='text'
                  name='excludeIngredients'
                  value={excludeIngredients}
                  onChange={onChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label htmlFor='type' className='px-1'>
                  Meal Type
                </Form.Label>
                <Form.Control
                  type='text'
                  name='type'
                  value={type}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label htmlFor='maxReadyTime' className='px-1'>
                  Max. Ready Time (minutes)
                </Form.Label>
                <Form.Control
                  type='text'
                  name='maxReadyTime'
                  value={maxReadyTime}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                sm={5}
                md={3}
                xl={2}
                className='d-none d-md-block'>
                <Form.Label
                  htmlFor='instructionsRequired'
                  className='text-center'>
                  Instructions Required?
                </Form.Label>
                <Form.Check
                  type='checkbox'
                  name='instructionsRequired'
                  checked={instructionsRequired}
                  onChange={onCheck}
                  className='text-center'
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className='d-md-none text-center'>
              <Form.Group as={Col} className='mb-0'>
                <Form.Label htmlFor='instructionsRequired' className='px-1'>
                  Instructions Required?
                </Form.Label>
                <Form.Check
                  type='checkbox'
                  name='instructionsRequired'
                  checked={instructionsRequired}
                  onChange={onCheck}
                  className='px-3'
                  inline
                />
              </Form.Group>
            </Form.Row>
          </Card>
        )}
        <Button type='submit' className='btn btn-primary btn-block mb-2'>
          Search
        </Button>
      </Form>
      {recipes.length > 0 && (
        <Button
          className='btn btn-light btn-block mb-3'
          onClick={() => clearSpoon(spoonDispatch)}>
          Clear
        </Button>
      )}
    </div>
  );
};

export default Search;
