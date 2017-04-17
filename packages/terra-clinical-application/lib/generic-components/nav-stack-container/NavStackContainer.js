'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./NavStackContainer.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  isHidden: _react.PropTypes.bool,
  children: _react.PropTypes.node
};

var NavStackContainer = function NavStackContainer(props) {
  return _react2.default.createElement(
    'div',
    { className: 'orion-NavStackContainer', 'aria-hidden': props.isHidden || null },
    _react2.default.createElement('div', { className: 'orion-NavStackContainer-shadow' }),
    props.children
  );
};

NavStackContainer.propTypes = propTypes;

exports.default = NavStackContainer;