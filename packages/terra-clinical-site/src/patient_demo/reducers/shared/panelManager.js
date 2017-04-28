import { disclose, push, pop, maximize, defaultState, supportedSizes } from './baseDisclosure';

import {
  DISCLOSE_PANEL,
  DISMISS_PANEL,
  PUSH_PANEL,
  POP_PANEL,
  TOGGLE_MAXIMIZE_PANEL,
} from '../../actions/shared/panelManager';

const defaultPanelState = Object.assign({}, defaultState, {
  size: supportedSizes.small,
  behavior: 'squish',
});
const panelManager = (state = defaultPanelState, action) => {
  switch (action.type) {
    case DISCLOSE_PANEL:
      return Object.assign({}, disclose(state, action), {
        size: action.data.size || supportedSizes.small,
        behavior: action.data.behavior || 'squish',
      });
    case DISMISS_PANEL:
      return defaultPanelState;
    case PUSH_PANEL:
      return push(state, action);
    case POP_PANEL:
      return pop(state, action);
    case TOGGLE_MAXIMIZE_PANEL:
      return maximize(state, action);
    default:
      return state;
  }
};

export default panelManager;
