import React from 'react';
import ReactDOM from 'react-dom';
import { Consumer, Provider } from 'xfc';
import Base from 'terra-base';
import PatientList from 'terra-clinical-application/src/patient-app/patient-list/PatientList';
import AppLayout from 'terra-clinical-application/src/navigation/layouts/app-layout/AppLayout';

import { embeddedNavHandshake } from './EmbeddedNavBootstrapper';
import { PatientApp } from './PatientApp';

import './demo.scss';

Consumer.init();

// Initialize provider when embedded.
if (window.top !== window) {
  Provider.init({
    acls: ['*'],
    secret: () => (Promise.resolve('Success')),
    onReady: () => {
      const embeddedComponent = (
        // <Base style={{ height: '100%', width: '100%' }}>
        <AppLayout>
          <PatientList physicianId="physician1" />
        </AppLayout>
        // </Base>
      );

      embeddedNavHandshake(embeddedComponent, (updatedComponent) => {
        ReactDOM.render(updatedComponent, document.getElementById('orion-application-default'));
      });
    },
  });
} else {
  ReactDOM.render(<PatientApp />, document.getElementById('orion-application-default'));
}

