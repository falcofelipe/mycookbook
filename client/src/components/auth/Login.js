import React, { useState, useEffect } from 'react';
import {
  useAlert,
  setAlert,
  removeAlerts,
} from '../../context/alert/AlertState';
import { useAuth, loginUser, clearErrors } from '../../context/auth/AuthState';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = props => {
  const alertDispatch = useAlert()[1];
  const [authState, authDispatch] = useAuth();

  const { error, isAuthenticated } = authState;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error) {
      setAlert(alertDispatch, error, 'danger');
      clearErrors(authDispatch);
    }
  }, [isAuthenticated, props.history, error, alertDispatch, authDispatch]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    removeAlerts(alertDispatch);

    if (email === '' || password === '') {
      setAlert(alertDispatch, 'Please fill in all fields', 'danger');
    } else {
      loginUser(authDispatch, {
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container bg-light'>
      <h1 className='mb-3'>
        Account <span className='text-primary'>Login</span>
      </h1>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={email}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </Form.Group>
        <Button
          variant='primary'
          type='submit'
          className='w-50 mx-auto btn-block'>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
