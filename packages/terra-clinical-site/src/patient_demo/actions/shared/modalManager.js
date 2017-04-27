export const DISCLOSE_MODAL = 'DISCLOSE_MODAL';
export const DISMISS_MODAL = 'DISMISS_MODAL';
export const PUSH_MODAL = 'PUSH_MODAL';
export const POP_MODAL = 'POP_MODAL';

export function discloseModal(discloseInfo) {
  return { type: DISCLOSE_MODAL, discloseInfo };
}

export function dismissModal(dismissInfo) {
  return { type: DISMISS_MODAL, dismissInfo };
}

export function pushModal(pushInfo) {
  return { type: PUSH_MODAL, pushInfo };
}

export function popModal(popInfo) {
  return { type: POP_MODAL, popInfo };
}
