import {
  DISCLOSE_MODAL,
  DISMISS_MODAL,
  PUSH_MODAL,
  POP_MODAL,
} from '../../actions/shared/modalManager';

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

export default modalManager;
