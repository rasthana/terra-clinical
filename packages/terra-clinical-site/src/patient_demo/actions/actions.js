export const DISCLOSE_MODAL = 'DISCLOSE_MODAL';
export const DISCLOSE_PANEL = 'DISCLOSE_PANEL';
export const DISCLOSE_MAIN = 'DISCLOSE_MAIN';

export function discloseModal(discloseInfo) {
  debugger;
  return { type: DISCLOSE_MODAL, discloseInfo };
}

export function disclosePanel(discloseInfo) {
  return { type: DISCLOSE_PANEL, discloseInfo };
}

export function discloseMain(discloseInfo) {
  return { type: DISCLOSE_MAIN, discloseInfo };
}

export const DISMISS_MODAL = 'DISMISS_MODAL';
export const DISMISS_PANEL = 'DISMISS_PANEL';
export const DISMISS_MAIN = 'DISMISS_MAIN';

export function dismissModal(dismissInfo) {
  return { type: DISMISS_MODAL, dismissInfo };
}

export function dismissPanel(dismissInfo) {
  return { type: DISMISS_PANEL, dismissInfo };
}

export function dismissMain(dismissInfo) {
  return { type: DISMISS_MAIN, dismissInfo };
}

export const PUSH_MODAL = 'PUSH_MODAL';
export const PUSH_PANEL = 'PUSH_PANEL';
export const PUSH_MAIN = 'PUSH_MAIN';

export function pushModal(pushInfo) {
  return { type: PUSH_MODAL, pushInfo };
}

export function pushPanel(pushInfo) {
  return { type: PUSH_PANEL, pushInfo };
}

export function pushMain(pushInfo) {
  return { type: PUSH_MAIN, pushInfo };
}

export const POP_MODAL = 'POP_MODAL';
export const POP_PANEL = 'POP_PANEL';
export const POP_MAIN = 'POP_MAIN';

export function popModal(popInfo) {
  return { type: POP_MODAL, popInfo };
}

export function popPanel(popInfo) {
  return { type: POP_PANEL, popInfo };
}

export function popMain(popInfo) {
  return { type: POP_MAIN, popInfo };
}
