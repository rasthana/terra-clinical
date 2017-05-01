import React from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import PatientAppController from './PatientAppController';
import patientAppController from './reducers/patientAppController';

const store = createStore(
  patientAppController,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const PatientApp = ({ app }) => (
  <Provider store={store}>
    <PatientAppController app={app} />
  </Provider>
);

export default PatientApp;
