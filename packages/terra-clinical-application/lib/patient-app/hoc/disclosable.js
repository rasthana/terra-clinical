'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComponentRegistry = require('../../navigation/core/registry/ComponentRegistry');

var _ComponentRegistry2 = _interopRequireDefault(_ComponentRegistry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var disclosable = function disclosable(customKey) {
  return function (WrappedComponent) {
    var Disclosable = function Disclosable(props) {
      return _react2.default.createElement(WrappedComponent, props);
    };

    Disclosable.displayName = function () {
      return 'Disclosable(' + (WrappedComponent.displayName || WrappedComponent.name || 'Component') + ')';
    }();

    Disclosable.disclosureKey = function () {
      return (WrappedComponent.displayName || WrappedComponent.name || 'Component') + '[' + (customKey || '') + ']';
    }();

    _ComponentRegistry2.default[Disclosable.disclosureKey] = Disclosable;

    return Disclosable;
  };
};

exports.default = disclosable;