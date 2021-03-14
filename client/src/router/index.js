import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Spinner, Box, Text } from '@chakra-ui/react';

import ErrorBoundary from '../components/ErrorBoundary';
import { AuthLayout, AppLayout } from '../layouts';

import Login from '../pages/Login';
import Page404 from '../pages/Page404';

import { RouteObjects } from './RouterConfig';

import { useAppState } from '../contexts/AppContext';

const routes = RouteObjects.map((x) => x.route);

const Router = () => {
  const { accounts } = useAppState();
  return (
    <BrowserRouter>
      {accounts == null ? (
        <Box
          minW="100vw"
          minH="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text mb={4}>No wallet address detected</Text>
          <Spinner color="green.500" size="xl" thickness="3px" />
        </Box>
      ) : (
        <>
          {accounts.length === 0 ? (
            <AuthLayout>
              <Switch>
                <Route
                  exact
                  path="/login"
                  render={() => (
                    <ErrorBoundary>
                      <Login />
                    </ErrorBoundary>
                  )}
                />
                <Redirect to="/login" />
              </Switch>
            </AuthLayout>
          ) : (
            <AppLayout>
              <Switch>
                {routes}
                <Redirect exact from="/" to="/overview" />
                <Redirect exact from="/login" to="/overview" />
                <Route render={() => <Page404 />} />
              </Switch>
            </AppLayout>
          )}
        </>
      )}
    </BrowserRouter>
  );
};

export default Router;
