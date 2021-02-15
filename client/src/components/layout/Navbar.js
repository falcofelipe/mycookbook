import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

const MainNavbar = ({ icon, title }) => {
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

  // const userLinks = (
  //   <NavDropdown
  //     title={`Hello ${user ? user.name : null}`}
  //     className='nav-acc-dropdown'>
  //     <Nav.Item>
  //       <Nav.Link href='/admin' className='nav-acc-link'>
  //         <i className='fas fa-cog' /> <span className='hide-sm'>Admin</span>
  //       </Nav.Link>
  //       <Nav.Link
  //         href='#!'
  //         onClick={() => logoutUser(authDispatch)}
  //         className='nav-acc-link'>
  //         <i className='fas fa-sign-out-alt' />{' '}
  //         <span className='hide-sm'>Logout</span>
  //       </Nav.Link>
  //     </Nav.Item>
  //   </NavDropdown>
  // );

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
            {nonUserLinks}
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
