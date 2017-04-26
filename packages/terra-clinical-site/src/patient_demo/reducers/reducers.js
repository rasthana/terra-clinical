import { combineReducers } from 'redux';

import {
  DISCLOSE_MODAL,
  DISCLOSE_PANEL,
  DISCLOSE_MAIN,
  DISMISS_MODAL,
  DISMISS_PANEL,
  DISMISS_MAIN,
  PUSH_MODAL,
  POP_MODAL,
  PUSH_PANEL,
  POP_PANEL,
  PUSH_MAIN,
  POP_MAIN,
} from '../actions/actions';

// const ComponentStateEntry = {
//   key: 'COMPONENT_KEY',
//   name: 'Component',
//   props: {
//     prop1: 'hi',
//     prop2: 42,
//   },
// };

const defaultModalState = {
  isOpen: false,
  size: 'small',
  componentKeys: [],
  components: {},
};
const modalManager = (state = defaultModalState, action) => {
  const newState = Object.assign({}, state);
  newState.componentKeys = Object.assign([], newState.componentKeys);
  newState.components = Object.assign({}, newState.components);

  debugger;

  switch (action.type) {
    case DISCLOSE_MODAL:
      newState.isOpen = true;
      newState.size = action.discloseInfo.size || 'small';
      newState.componentKeys = [action.discloseInfo.content.key];
      newState.components[action.discloseInfo.content.key] = {
        name: action.discloseInfo.content.name,
        props: action.discloseInfo.content.props,
      };

      return newState;
    case DISMISS_MODAL:
      return defaultModalState;
    case PUSH_MODAL:
      newState.componentKeys = Object.assign([], newState.componentKeys);
      newState.componentKeys.push(action.pushInfo.content.key);
      newState.components[action.pushInfo.content.key] = {
        name: action.pushInfo.content.name,
        props: action.pushInfo.content.props,
      };

      return newState;
    case POP_MODAL:
      newState.componentKeys = Object.assign([], newState.componentKeys);
      newState.components[newState.componentKeys.pop()] = undefined;

      return newState;
    default:
      return state;
  }
};

const defaultPanelState = {
  isOpen: false,
  size: 'small',
  behavior: 'squish',
  componentStack: [],
};
const panelManager = (state = defaultPanelState, action) => {
  switch (action.type) {
    case DISCLOSE_PANEL:
      return state;
    case DISMISS_PANEL:
      return state;
    case PUSH_PANEL:
      return state;
    case POP_PANEL:
      return state;
    default:
      return state;
  }
};

const defaultMainState = {
  componentStack: [],
};
const mainManager = (state = defaultMainState, action) => {
  switch (action.type) {
    case DISCLOSE_MAIN:
      return state;
    case DISMISS_MAIN:
      return state;
    case PUSH_MAIN:
      return state;
    case POP_MAIN:
      return state;
    default:
      return state;
  }
};

const patientApp = combineReducers({
  modalManager,
  panelManager,
  mainManager,
});

export default patientApp;
