import React from 'react';
import ReactDOM from 'react-dom';
import { Consumer } from 'xfc';

import EmbeddedContentProvider from 'terra-clinical-application/src/patient-app/embedded-content-provider/EmbeddedContentProvider';
// import PatientListController from 'terra-clinical-application/src/patient-app/patient-list/PatientListController';

// import { embeddedNavHandshake } from './EmbeddedNavBootstrapper';
import PatientAppController from './PatientAppController';

import './demo.scss';

Consumer.init();

// Initialize provider when embedded.
if (window.top !== window) {
  ReactDOM.render((
    <EmbeddedContentProvider
      content={<PatientAppController />}
    />
  ), document.getElementById('orion-application-default'));
} else {
  ReactDOM.render(<PatientAppController />, document.getElementById('orion-application-default'));
}

