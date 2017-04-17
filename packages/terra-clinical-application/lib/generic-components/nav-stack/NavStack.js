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
  items: _react.PropTypes.array
};

var NavStack = function NavStack(props) {
  // We don't want to render the transition group when no children exist. Doing so will cause the first child to
  // animate into place, which in most cases we do not want.
  if (!props.items || !props.items.length) {
    return null;
  }

  // We use the key from the first child as the key for the transition group. This will cause the transition group to
  // rerender when root child changes and subsequently prevent that child from animating into position.
  var transitionGroupKey = props.items[0].key;

  var itemCount = props.items.length;

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
    props.items.map(function (item, index) {
      return _react2.default.createElement(
        _NavStackContainer2.default,
        { key: item.key, isHidden: index !== itemCount - 1 },
        item
      );
    })
  );
};

NavStack.propTypes = propTypes;

exports.default = NavStack;