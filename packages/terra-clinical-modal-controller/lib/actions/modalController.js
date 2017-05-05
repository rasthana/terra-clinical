'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disclose = disclose;
exports.dismiss = dismiss;
exports.push = push;
exports.pop = pop;
exports.toggleMaximize = toggleMaximize;
var DISCLOSE_MODAL = exports.DISCLOSE_MODAL = 'DISCLOSE_MODAL';
var DISMISS_MODAL = exports.DISMISS_MODAL = 'DISMISS_MODAL';
var PUSH_MODAL = exports.PUSH_MODAL = 'PUSH_MODAL';
var POP_MODAL = exports.POP_MODAL = 'POP_MODAL';
var TOGGLE_MAXIMIZE_MODAL = exports.TOGGLE_MAXIMIZE_MODAL = 'TOGGLE_MAXIMIZE_MODAL';

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

function toggleMaximize(data) {
  return { type: TOGGLE_MAXIMIZE_MODAL, data: data };
}