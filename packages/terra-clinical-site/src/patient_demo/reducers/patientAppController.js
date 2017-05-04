import { combineReducers } from 'redux';

import panel from './shared/panel';

const patientAppController = combineReducers({
  panelManager: panel,
});

export default patientAppController;
