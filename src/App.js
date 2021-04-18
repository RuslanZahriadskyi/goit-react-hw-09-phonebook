import { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authOperations, authSelectors } from './redux/auth';
import { Container } from '@material-ui/core';
import Navigation from './components/Navigation';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRouter';
import Loading from './components/Loader';
import { ToastContainer, cssTransition } from 'react-toastify';
import 'animate.css/animate.min.css';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const ContactsPage = lazy(() =>
  import(
    './views/ContactsPage/ContactsPage.container' /* webpackChunkName: "contacts-page" */
  ),
);
const RegisterPage = lazy(() =>
  import('./views/RegisterPage' /* webpackChunkName: "register-page" */),
);
const LoginPage = lazy(() =>
  import('./views/LoginPage' /* webpackChunkName: "login-page" */),
);

const bounce = cssTransition({
  enter: 'animate__animated animate__rubberBand',
  exit: 'animate__animated animate__hinge',
});

class App extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    // console.log();
    return (
      <>
        <ToastContainer transition={bounce} autoClose={2000} />

        <Container maxWidth="md">
          <Navigation />
          <Suspense
            fallback={
              <div>
                <Loading />
              </div>
            }
          >
            <Switch>
              <Route path="/" exact component={HomePage} />
              <PrivateRouter path="/contacts" exact component={ContactsPage} />
              <PublicRouter
                path="/login"
                restricted
                exact
                component={LoginPage}
              />
              <PublicRouter
                path="/register"
                restricted
                exact
                component={RegisterPage}
              />
            </Switch>
          </Suspense>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  token: authSelectors.getToken(state),
});

const mapDispatchToProps = {
  getCurrentUser: authOperations.getCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
