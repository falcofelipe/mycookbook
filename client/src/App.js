import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';

import Navbar from './components/layout/Navbar.js';
import Alert from './components/layout/Alert.js';

import MyRecipesRoot from './components/pages/MyRecipesRoot';

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
                <Navbar title='My Cookbook' icon='fas fa-utensils' />
                <Container>
                  <Alert />
                  <Switch>
                    <PrivateRoute exact path='/' component={MyRecipesRoot} />
                    <Route exact path='/search' component={SearchSpoon} />
                    <Route exact path='/about' component={About} />
                    <Route
                      exact
                      path='/search/recipes/:id'
                      component={SpoonRecipe}
                    />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route component={NotFound} />
                  </Switch>
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
