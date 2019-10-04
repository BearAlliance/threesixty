import React from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';
import { Splash } from './splash/splash';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Nav } from './nav/nav.component';
import { LoginPage } from './login/login.component';
import { SignupPage } from './signup/singup.component';
import { HomePage } from './home/home.component';
import { SettingsPage } from './settings/settings.component';
import { Footer } from './footer/footer.component';

function App() {
  const routes = [
    {
      path: '/home',
      component: HomePage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/signup',
      component: SignupPage
    },
    {
      path: '/settings',
      component: SettingsPage
    },
    {
      path: '/',
      component: Splash
    }
  ];
  return (
    <div className="App">
      <Router>
        <Nav />
        <div className="container">
          <Switch>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
