'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./NavigationSlide.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  isHidden: _react.PropTypes.bool,
  children: _react.PropTypes.node
};

var NavigationSlide = function NavigationSlide(props) {
  return _react2.default.createElement(
    'div',
    { className: 'terraClinical-NavigationSlide', 'aria-hidden': props.isHidden || null },
    _react2.default.createElement('div', { className: 'terraClinical-NavigationSlide-shadow' }),
    props.children
  );
};

NavigationSlide.propTypes = propTypes;

exports.default = NavigationSlide;