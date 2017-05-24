/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import ReduxTests from './ReduxTests';

// Test Cases
// import DefaultRedux from './DefaultRedux';

const routes = (
  <div>
    <Route path="/tests/redux-tests" component={ReduxTests} />
  </div>
);

export default routes;
