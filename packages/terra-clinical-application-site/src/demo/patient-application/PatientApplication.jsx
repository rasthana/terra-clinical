import React, { PropTypes } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import TerraApplication from '../terra-application/TerraApplication';
import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';

import ModalController, { reducers as modalControllerReducers } from '../terra-clinical-modal-controller/ModalController';
import PatientListController, { reducers as patientListReducers } from 'terra-clinical-application/src/patient-app/patient-list/PatientListController';

import patientApplication from './reducers/patientApplication';

const store = createStore(
  combineReducers(Object.assign({}, { patientApplication }, patientListReducers, modalControllerReducers)),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const physicianId = 'physician1';

class PatientApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TerraApplication style={{ height: '100%', width: '100%' }}>
          <ModalController>
            <PatientListController
              physicianId={physicianId}
              key={'PATIENT_LIST_APP'}
            />
          </ModalController>
        </TerraApplication>
      </Provider>
    );
  }
}

PatientApplication.propTypes = {
  app: AppDelegate.propType,
};

export default PatientApplication;
