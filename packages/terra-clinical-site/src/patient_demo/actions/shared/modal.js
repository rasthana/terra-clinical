export const DISCLOSE_MODAL = 'DISCLOSE_MODAL';
export const DISMISS_MODAL = 'DISMISS_MODAL';
export const PUSH_MODAL = 'PUSH_MODAL';
export const POP_MODAL = 'POP_MODAL';
export const TOGGLE_MAXIMIZE_MODAL = 'TOGGLE_MAXIMIZE_MODAL';

export function disclose(data) {
  return { type: DISCLOSE_MODAL, data };
}

export function dismiss(data) {
  return { type: DISMISS_MODAL, data };
}

export function push(data) {
  return { type: PUSH_MODAL, data };
}

export function pop(data) {
  return { type: POP_MODAL, data };
}

export function toggleMaximize(data) {
  return { type: TOGGLE_MAXIMIZE_MODAL, data };
}
