export const DISCLOSE_PANEL = 'DISCLOSE_PANEL';
export const DISMISS_PANEL = 'DISMISS_PANEL';
export const PUSH_PANEL = 'PUSH_PANEL';
export const POP_PANEL = 'POP_PANEL';

export function disclosePanel(discloseInfo) {
  return { type: DISCLOSE_PANEL, discloseInfo };
}

export function dismissPanel(dismissInfo) {
  return { type: DISMISS_PANEL, dismissInfo };
}

export function pushPanel(pushInfo) {
  return { type: PUSH_PANEL, pushInfo };
}

export function popPanel(popInfo) {
  return { type: POP_PANEL, popInfo };
}
