import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import SpoonRecipe from './components/spoon-recipes/SpoonRecipe.js';
import Alert from './components/layout/Alert.js';
import About from './components/pages/About.js';
import Home from './components/pages/Home.js';
import NotFound from './components/pages/NotFound.js';

import SpoonState from './context/spoon/SpoonState';
import AlertState from './context/alert/AlertState';

import './assets/sass/main.scss';
import Container from 'react-bootstrap/Container';

const App = () => {
  return (
    <SpoonState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar title='My Cookbook' icon='fas fa-utensils' />
            <Container>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/about' component={About} />
                <Route
                  exact
                  path='/spoonacular/recipes/:id'
                  component={SpoonRecipe}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </div>
        </Router>
      </AlertState>
    </SpoonState>
  );
};

export default App;
