import { Suspense, lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from './redux/auth';
import { Container } from '@material-ui/core';
import Navigation from './components/Navigation';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRouter';
import Loading from './components/Loader';
import { ToastContainer, cssTransition, toast } from 'react-toastify';
import 'animate.css/animate.min.css';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const ContactsPage = lazy(() =>
  import('./views/ContactsPage' /* webpackChunkName: "contacts-page" */),
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

export default function App() {
  const dispatch = useDispatch();

  const error = useSelector(authSelectors.getErrorValue);
  const userName = useSelector(authSelectors.getUserName);

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    error && toast.error(`${error}`);
    userName && toast.success(`Welcome dear ${userName}`);
  }, [error, userName]);

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
            <Route path="/" exact>
              <HomePage />
            </Route>
            <PrivateRouter path="/contacts" exact>
              <ContactsPage />
            </PrivateRouter>
            <PublicRouter path="/login" restricted exact>
              <LoginPage />
            </PublicRouter>
            <PublicRouter path="/register" restricted exact>
              <RegisterPage />
            </PublicRouter>
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}
