/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import ClinicalApplicationTests from './ClinicalApplicationTests';
import DefaultClinicalApplication from './DefaultClinicalApplication';

const routes = (
  <div>
    <Route path="/tests/clinical-application-tests" component={ClinicalApplicationTests} />
    <Route path="/tests/clinical-application-tests/default" component={DefaultClinicalApplication} />
  </div>
);

export default routes;
