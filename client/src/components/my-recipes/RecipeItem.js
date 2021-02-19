import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const RecipeItem = ({ recipe, location }) => {
  const { _id, title, imageUrl } = recipe;

  return (
    <Card className='text-center bg-light h-100'>
      <Card.Img
        variant='top'
        src={imageUrl}
        alt={`Picture of the recipe ${title}`}
      />
      <Card.Body className='pb-0'>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
      <Card.Footer className='pt-0'>
        <Link
          as={Button}
          to={{
            pathname: `/recipes/${_id}`,
            state: {
              recipe,
              fromLink: location.pathname,
            },
          }}
          className='btn btn-primary btn-sm my-1 btn-block w-75 mx-auto'>
          Details
        </Link>
      </Card.Footer>
    </Card>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeItem;
