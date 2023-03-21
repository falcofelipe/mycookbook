import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const MySpinner = () => {
  return (
    <div className='text-center text-primary bg-dark my-5'>
      <Spinner animation='border' style={{ width: '4rem', height: '4rem' }} />
    </div>
  );
};

export default MySpinner;
