import { combineReducers } from 'redux';

import {
  DISCLOSE_PANEL,
  DISMISS_PANEL,
  PUSH_PANEL,
  POP_PANEL,
} from '../../actions/actions';

const defaultPanelState = {
  isOpen: false,
  size: 'small',
  behavior: 'squish',
  componentKeys: [],
  components: {},
};
const panelManager = (state = defaultPanelState, action) => {
  const newState = Object.assign({}, state);
  newState.componentKeys = Object.assign([], newState.componentKeys);
  newState.components = Object.assign({}, newState.components);

  switch (action.type) {
    case DISCLOSE_PANEL:
      newState.isOpen = true;
      newState.size = action.discloseInfo.size || 'small';
      newState.behavior = action.discloseInfo.behavior || 'squish';
      newState.componentKeys = [action.discloseInfo.content.key];
      newState.components[action.discloseInfo.content.key] = {
        name: action.discloseInfo.content.name,
        props: action.discloseInfo.content.props,
      };

      return newState;
    case DISMISS_PANEL:
      return defaultPanelState;
    case PUSH_PANEL:
      newState.componentKeys.push(action.pushInfo.content.key);
      newState.components[action.pushInfo.content.key] = {
        name: action.pushInfo.content.name,
        props: action.pushInfo.content.props,
      };

      return newState;
    case POP_PANEL:
      newState.components[newState.componentKeys.pop()] = undefined;

      return newState;
    default:
      return state;
  }
};

export default panelManager;
