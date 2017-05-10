'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disclose = disclose;
exports.dismiss = dismiss;
exports.push = push;
exports.pop = pop;
exports.maximize = maximize;
exports.minimize = minimize;
var DISCLOSE_MODAL = exports.DISCLOSE_MODAL = 'MC_DISCLOSE_MODAL';
var DISMISS_MODAL = exports.DISMISS_MODAL = 'MC_DISMISS_MODAL';
var PUSH_MODAL = exports.PUSH_MODAL = 'MC_PUSH_MODAL';
var POP_MODAL = exports.POP_MODAL = 'MC_POP_MODAL';
var MAXIMIZE_MODAL = exports.MAXIMIZE_MODAL = 'MC_MAXIMIZE_MODAL';
var MINIMIZE_MODAL = exports.MINIMIZE_MODAL = 'MC_MINIMIZE_MODAL';

function disclose(data) {
  return { type: DISCLOSE_MODAL, data: data };
}

function dismiss(data) {
  return { type: DISMISS_MODAL, data: data };
}

function push(data) {
  return { type: PUSH_MODAL, data: data };
}

function pop(data) {
  return { type: POP_MODAL, data: data };
}

function maximize(data) {
  return { type: MAXIMIZE_MODAL, data: data };
}

function minimize(data) {
  return { type: MINIMIZE_MODAL, data: data };
}