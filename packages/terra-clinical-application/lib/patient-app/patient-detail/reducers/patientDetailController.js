'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var patientDetailController = function patientDetailController() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'DISCLOSE_MODAL':
      return 'Patient detail reducer';
    default:
      return state;
  }
};

exports.default = patientDetailController;