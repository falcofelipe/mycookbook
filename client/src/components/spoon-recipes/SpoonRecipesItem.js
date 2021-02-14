import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SpoonRecipesItem = ({ recipe, location }) => {
  const { title, image, id } = recipe;

  return (
    <Card className='text-center'>
      <Card.Img
        variant='top'
        src={image}
        alt={`Picture of the recipe ${title}`}
        // style={{ width: '150px' }}
      />
      <Card.Body className='pb-0'>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <Card.Footer className='pt-0'>
        <Link
          as={Button}
          to={{
            pathname: `/spoonacular/recipes/${id}`,
            state: {
              recipe,
              fromLink: location.pathname,
            },
          }}
          className='btn btn-primary btn-sm my-1 btn-block w-75 mx-auto'>
          Details
        </Link>
        {/* <Button
          variant='primary'
          className='btn-sm my-1 btn-block w-75 mx-auto'
          onClick={() => console.log(recipe)}>
          Details
        </Button> */}
      </Card.Footer>
    </Card>
  );
};

SpoonRecipesItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default SpoonRecipesItem;
