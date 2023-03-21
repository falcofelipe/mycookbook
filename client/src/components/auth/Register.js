import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	useAlert,
	setAlert,
	removeAlerts,
} from '../../context/alert/AlertState';
import {
	useAuth,
	registerUser,
	clearErrors,
} from '../../context/auth/AuthState';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = (props) => {
	const alertDispatch = useAlert()[1];
	const [authState, authDispatch] = useAuth();

	const { error, isAuthenticated } = authState;

	const navigate = useNavigate();

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		passwordConf: '',
	});

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}

		if (error) {
			setAlert(alertDispatch, error, 'danger');
			clearErrors(authDispatch);
		}
	}, [error, isAuthenticated, navigate, alertDispatch, authDispatch]);

	const { name, email, password, passwordConf } = user;

	const onChange = (e) =>
		setUser({ ...user, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		removeAlerts(alertDispatch);

		if (name === '' || email === '' || password === '') {
			setAlert(alertDispatch, 'Please fill in all fields', 'danger');
		} else if (password !== passwordConf) {
			setAlert(alertDispatch, 'Passwords do not match', 'danger');
		} else {
			registerUser(authDispatch, { name, email, password });
		}
	};

	return (
		<div className='form-container bg-light'>
			<h1 className='mb-3'>
				Account <span className='text-primary'>Register</span>
			</h1>
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label>Name:</Form.Label>
					<Form.Control
						type='text'
						name='name'
						value={name}
						onChange={onChange}
					/>
				</Form.Group>
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
				<Form.Group>
					<Form.Label>Confirm your Password:</Form.Label>
					<Form.Control
						type='password'
						name='passwordConf'
						value={passwordConf}
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

export default Register;
