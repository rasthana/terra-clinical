/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import ClinicalNavigationControllerTests from './ClinicalNavigationControllerTests';
import DefaultClinicalNavigationController from './DefaultClinicalNavigationController';

const routes = (
  <div>
    <Route path="/tests/clinical-navigation-controller-tests" component={ClinicalNavigationControllerTests} />
    <Route path="/tests/clinical-navigation-controller-tests/default" component={DefaultClinicalNavigationController} />
  </div>
);

export default routes;
