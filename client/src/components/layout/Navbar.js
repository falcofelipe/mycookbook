import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import { useAuth, logoutUser } from '../../context/auth/AuthState';

const MainNavbar = ({ icon, title }) => {
  const [authState, authDispatch] = useAuth();

  const { isAuthenticated, user } = authState;

  const firstName = user ? user.name.split(' ')[0] : null;

  const nonUserLinks = (
    <NavDropdown title='Account' className='text-dark nav-acc-dropdown'>
      <Nav.Item>
        <Nav.Link href='/login' className='nav-acc-link'>
          <i className='fas fa-sign-in-alt' />{' '}
          <span className='hide-sm'>Login</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/register' className='nav-acc-link'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'>Register</span>
        </Nav.Link>
      </Nav.Item>
    </NavDropdown>
  );

  const userLinks = (
    <NavDropdown
      title={`Hello ${user ? firstName : null}`}
      className='nav-acc-dropdown'>
      <Nav.Item>
        <Nav.Link
          href='#!'
          onClick={() => logoutUser(authDispatch)}
          className='nav-acc-link'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </Nav.Link>
      </Nav.Item>
    </NavDropdown>
  );

  return (
    <Navbar
      bg='light'
      variant='light'
      expand='md'
      className='py-2 mb-1'
      id='main-navbar'>
      <Container>
        <Navbar.Brand>
          <h2>
            <a href='/' className='text-dark'>
              <i className={icon} /> {title}
            </a>
          </h2>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='main-navbar-nav' />
        <Navbar.Collapse id='main-navbar-nav'>
          <Nav className='ml-auto lead'>
            <Nav.Link as={Link} to='/' className='text-dark'>
              Search
            </Nav.Link>
            <Nav.Link as={Link} to='/recipes' className='text-dark'>
              My Recipes
            </Nav.Link>
            <Nav.Link as={Link} to='/about' className='text-dark'>
              About Us
            </Nav.Link>
            {isAuthenticated ? userLinks : nonUserLinks}
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
