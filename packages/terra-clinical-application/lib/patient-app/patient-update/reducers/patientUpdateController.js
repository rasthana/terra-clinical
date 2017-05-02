'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var patientUpdateController = function patientUpdateController() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case 'DISCLOSE_MODAL':
      return 'Patient update reducer';
    default:
      return state;
  }
};

exports.default = patientUpdateController;