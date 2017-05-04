/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import ClinicalApplicationSiteTests from './ClinicalApplicationSiteTests';
import DefaultClinicalApplicationSite from './DefaultClinicalApplicationSite';

const routes = (
  <div>
    <Route path="/tests/clinical-application-site-tests" component={ClinicalApplicationSiteTests} />
    <Route path="/tests/clinical-application-site-tests/default" component={DefaultClinicalApplicationSite} />
  </div>
);

export default routes;
