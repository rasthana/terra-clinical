'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _terraBase = require('terra-base');

var _terraBase2 = _interopRequireDefault(_terraBase);

var _AppDelegate = require('../../core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

require('./ClinicalBase.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ClinicalBase = function ClinicalBase(_ref) {
  var app = _ref.app,
      children = _ref.children,
      customProps = _objectWithoutProperties(_ref, ['app', 'children']);

  return _react2.default.createElement(
    _terraBase2.default,
    customProps,
    _react2.default.Children.map(children, function (child) {
      return _react2.default.cloneElement(child, { app: app });
    })
  );
};

ClinicalBase.propTypes = {
  children: _react.PropTypes.node,
  app: _AppDelegate2.default.propType
};

exports.default = ClinicalBase;