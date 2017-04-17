'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconSpinner = require('terra-icon/lib/icon/IconSpinner');

var _IconSpinner2 = _interopRequireDefault(_IconSpinner);

require('./ActivityIndicator.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActivityIndicator = function ActivityIndicator() {
  return _react2.default.createElement(
    'div',
    { className: 'orion-ActivityIndicator', tabIndex: '-1' },
    _react2.default.createElement(
      'div',
      { className: 'orion-ActivityIndicator-content', style: { fontSize: '24px' } },
      _react2.default.createElement(_IconSpinner2.default, { isSpin: true }),
      _react2.default.createElement(
        'span',
        { style: { paddingLeft: '5px' } },
        'Loading'
      )
    )
  );
};

exports.default = ActivityIndicator;