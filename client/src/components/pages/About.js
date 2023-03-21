import React from 'react';
import Card from 'react-bootstrap/Card';

const About = () => {
  return (
    <Card bg='light' className='mt-4'>
      <Card.Body className='text-dark'>
        <h1 className='text-primary'>About Us</h1>
        <p>
          MyCookbook is a fullstack web application where you can search, save,
          add and edit recipes. The application was made using React.js,
          Node.js, Express and Bootstrap.
        </p>
        <p>Version: 1.0.0.</p>
        <p>
          Made by Felipe Falco. If you have any issues, please contact me at{' '}
          <a href='mailto:f.falco@sandp-pro.com'>f.falco@sandp-pro.com</a>.
        </p>
      </Card.Body>
    </Card>
  );
};

export default About;
