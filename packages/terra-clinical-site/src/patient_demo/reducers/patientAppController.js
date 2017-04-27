import { combineReducers } from 'redux';

import modalManager from './shared/modalManager';
import panelManager from './shared/panelManager';

const patientApp = combineReducers({
  modalManager,
  panelManager,
});

export default patientApp;
