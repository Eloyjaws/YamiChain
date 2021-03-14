/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import Overview from '../pages/Overview';
import Agents from '../pages/Agents';
import Agent from '../pages/Agent';
import Customers from '../pages/Customers';
import Customer from '../pages/Customer';
import Loans from '../pages/Loans';
import Loan from '../pages/Loan';
import Payments from '../pages/Payments';
import Payment from '../pages/Payment';
import Providers from '../pages/Providers';
import Provider from '../pages/Provider';
import Settings from '../pages/Settings';

export const RouteObjects = [
  {
    route: (
      <Route
        exact
        key="/overview"
        path="/overview"
        render={(routeProps) => (
          <ErrorBoundary>
            <Overview {...routeProps} />
          </ErrorBoundary>
        )}
      />
    ),
  },
  {
    route: (
      <Route
        exact
        key="/agents"
        path="/agents"
        render={() => (
          <ErrorBoundary>
            <Agents />
          </ErrorBoundary>
        )}
      />
    ),
  },
  {
    route: (
      <Route
        exact
        key="/agent"
        path="/agent/:agentId"
        render={(routeProps) => (
          <ErrorBoundary>
            <Agent {...routeProps} />
          </ErrorBoundary>
        )}
      />
    ),
  },
  {
    route: (
      <Route
        exact
        key="/customers"
        path="/customers"
        render={() => (
          <ErrorBoundary>
            <Customers />
          </ErrorBoundary>
        )}
      />
    ),
  },
  {
    route: (
      <Route
        exact
        key="/customer"
        path="/customer/:customerId"
        render={(routeProps) => (
          <ErrorBoundary>
            <Customer {...routeProps} />
          </ErrorBoundary>
        )}
      />
    ),
  },
  {
    route: (
      <Route
        exact
        key="/loans"
        path="/loans"
        render={() => (
          <ErrorBoundary>
            <Loans />
          </ErrorBoundary>
        )}
      />
    ),
  },
  {
    route: (
      <Route
        exact
        key="/loan"
        path="/loan/:loanId"
        render={(routeProps) => (
          <ErrorBoundary>
            <Loan {...routeProps} />
          </ErrorBoundary>
        )}
      />
    ),
  },
  {
    route: (
      <Route
        exact
        key="/payments"
        path="/payment"
        render={() => (
          <ErrorBoundary>
            <Payments />
          </ErrorBoundary>
        )}
      />
    ),
  },
  {
    route: (
      <Route
        exact
        key="/payment"
        path="/payment/:paymentId"
        render={(routeProps) => (
          <ErrorBoundary>
            <Payment {...routeProps} />
          </ErrorBoundary>
        )}
      />
    ),
  },
  {
    route: (
      <Route
        exact
        key="/providers"
        path="/providers"
        render={() => (
          <ErrorBoundary>
            <Providers />
          </ErrorBoundary>
        )}
      />
    ),
  },
  {
    route: (
      <Route
        exact
        key="/provider"
        path="/provider/:providerId"
        render={(routeProps) => (
          <ErrorBoundary>
            <Provider {...routeProps} />
          </ErrorBoundary>
        )}
      />
    ),
  },
  {
    route: (
      <Route
        exact
        key="/settings"
        path="/settings"
        render={() => (
          <ErrorBoundary>
            <Settings />
          </ErrorBoundary>
        )}
      />
    ),
  },
];
