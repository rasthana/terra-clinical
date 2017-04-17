'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _NavStackContainer = require('../nav-stack-container/NavStackContainer');

var _NavStackContainer2 = _interopRequireDefault(_NavStackContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  animationIsDisabled: _react.PropTypes.bool,
  children: _react.PropTypes.node
};

var NavStack = function NavStack(props) {
  // We don't want to render the transition group when no children exist. Doing so will cause the first child to
  // animate into place, which in most cases we do not want.
  if (!_react2.default.Children.count(props.children)) {
    return null;
  }

  // We use the key from the first child as the key for the transition group. This will cause the transition group to
  // rerender when root child changes and subsequently prevent that child from animating into position.
  var transitionGroupKey = _react2.default.Children.toArray(props.children)[0].key;

  var childCount = _react2.default.Children.count(props.children);

  return _react2.default.createElement(
    _reactAddonsCssTransitionGroup2.default,
    {
      key: transitionGroupKey,
      transitionEnter: !props.animationIsDisabled,
      transitionLeave: !props.animationIsDisabled,
      transitionName: 'stack-nav',
      transitionEnterTimeout: 300,
      transitionLeaveTimeout: 300
    },
    _react2.default.Children.map(props.children, function (child, index) {
      return _react2.default.createElement(
        _NavStackContainer2.default,
        { key: child.key, isHidden: index !== childCount - 1 },
        child
      );
    })
  );
};

NavStack.propTypes = propTypes;

exports.default = NavStack;