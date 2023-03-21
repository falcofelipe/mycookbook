import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';

import Navbar from './components/layout/Navbar.js';
import Alert from './components/layout/Alert.js';

import MyRecipesRoot from './components/pages/MyRecipesRoot';
import RecipeForm from './components/my-recipes/RecipeForm';
import RecipePage from './components/my-recipes/RecipePage';

import SearchSpoon from './components/pages/SearchSpoon.js';
import SpoonRecipe from './components/spoon-recipes/SpoonRecipe.js';

import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';

import About from './components/pages/About.js';
import NotFound from './components/pages/NotFound.js';

import SpoonState from './context/spoon/SpoonState';
import RecipesState from './context/my-recipes/RecipesState';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';

import './assets/sass/main.scss';
import Container from 'react-bootstrap/Container';

const App = () => {
	return (
		<AuthState>
			<RecipesState>
				<SpoonState>
					<AlertState>
						<Router>
							<div className='App'>
								<Navbar
									title='My Cookbook'
									icon='fas fa-utensils'
								/>
								<Container>
									<Alert />
									<Routes>
										<Route
											path='/recipes'
											element={
												<PrivateRoute>
													<MyRecipesRoot />
												</PrivateRoute>
											}
										/>
										<Route
											path='/recipes/form'
											element={
												<PrivateRoute>
													<RecipeForm />
												</PrivateRoute>
											}
										/>
										<Route
											path='/recipes/:id'
											element={
												<PrivateRoute>
													<RecipePage />
												</PrivateRoute>
											}
										/>
										<Route
											path='/'
											element={<SearchSpoon />}
										/>
										<Route
											path='/about'
											element={<About />}
										/>
										<Route
											path='/search/:id'
											element={<SpoonRecipe />}
										/>
										<Route
											path='/login'
											element={<Login />}
										/>
										<Route
											path='/register'
											element={<Register />}
										/>
										<Route element={<NotFound />} />
									</Routes>
								</Container>
							</div>
						</Router>
					</AlertState>
				</SpoonState>
			</RecipesState>
		</AuthState>
	);
};

export default App;
