import { disclose, push, pop, maximize, defaultState, supportedSizes } from './disclosure';

import {
  DISCLOSE_MODAL,
  DISMISS_MODAL,
  PUSH_MODAL,
  POP_MODAL,
  TOGGLE_MAXIMIZE_MODAL,
} from '../../actions/shared/modal';

const defaultModalState = Object.assign({}, defaultState, {
  size: supportedSizes.small,
});
const modalManager = (state = defaultModalState, action) => {
  switch (action.type) {
    case DISCLOSE_MODAL:
      return Object.assign({}, disclose(state, action), { size: action.data.size || supportedSizes.small });
    case DISMISS_MODAL:
      return defaultModalState;
    case PUSH_MODAL:
      return push(state, action);
    case POP_MODAL:
      return pop(state, action);
    case TOGGLE_MAXIMIZE_MODAL:
      return maximize(state, action);
    default:
      return state;
  }
};

export default modalManager;
