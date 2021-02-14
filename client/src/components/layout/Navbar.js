import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const MainNavbar = ({ icon, title }) => {
  return (
    <Navbar
      bg='light'
      variant='light'
      expand='sm'
      className='py-2 mb-1'
      id='main-navbar'>
      <Container>
        <Navbar.Brand>
          <h2>
            <i className={icon} /> {title}
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navbar-nav' />
        <Navbar.Collapse id='main-navbar-nav'>
          <Nav className='ml-auto lead'>
            <Nav.Link as={Link} to='/' className='text-dark'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/' className='text-dark'>
              Search
            </Nav.Link>
            <Nav.Link as={Link} to='/about' className='text-dark'>
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

MainNavbar.defaultProps = {
  title: 'Github Finder',
  icon: 'fab fa-github',
};

MainNavbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default MainNavbar;
