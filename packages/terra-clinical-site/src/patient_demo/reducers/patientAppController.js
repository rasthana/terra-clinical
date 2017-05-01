import { combineReducers } from 'redux';

import modal from './shared/modal';
import panel from './shared/panel';

const patientAppController = combineReducers({
  modalManager: modal,
  panelManager: panel,
});

export default patientAppController;
