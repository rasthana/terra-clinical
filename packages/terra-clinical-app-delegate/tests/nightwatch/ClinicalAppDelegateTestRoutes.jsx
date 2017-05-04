/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import ClinicalAppDelegateTests from './ClinicalAppDelegateTests';
import DefaultClinicalAppDelegate from './DefaultClinicalAppDelegate';

const routes = (
  <div>
    <Route path="/tests/clinical-app-delegate-tests" component={ClinicalAppDelegateTests} />
    <Route path="/tests/clinical-app-delegate-tests/default" component={DefaultClinicalAppDelegate} />
  </div>
);

export default routes;
