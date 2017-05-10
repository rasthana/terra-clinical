export const DISCLOSE_MODAL = 'DISCLOSE_MODAL';
export const DISMISS_MODAL = 'DISMISS_MODAL';
export const PUSH_MODAL = 'PUSH_MODAL';
export const POP_MODAL = 'POP_MODAL';
export const MAXIMIZE_MODAL = 'MAXIMIZE_MODAL';
export const MINIMIZE_MODAL = 'MINIMIZE_MODAL';

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

export function maximize(data) {
  return { type: MAXIMIZE_MODAL, data };
}

export function minimize(data) {
  return { type: MINIMIZE_MODAL, data };
}
