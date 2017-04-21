'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _terraButton = require('terra-button');

var _terraButton2 = _interopRequireDefault(_terraButton);

var _IconClose = require('terra-icon/lib/icon/IconClose');

var _IconClose2 = _interopRequireDefault(_IconClose);

var _IconLeft = require('terra-icon/lib/icon/IconLeft');

var _IconLeft2 = _interopRequireDefault(_IconLeft);

var _IconMaximize = require('terra-icon/lib/icon/IconMaximize');

var _IconMaximize2 = _interopRequireDefault(_IconMaximize);

var _AppDelegate = require('../app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

require('./NavigationHeader.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavigationHeader = function NavigationHeader(_ref) {
  var app = _ref.app,
      title = _ref.title,
      children = _ref.children,
      hasBottomBorder = _ref.hasBottomBorder;

  if (!app) {
    return _react2.default.createElement('header', { className: 'terra-NavigationHeader' });
  }

  var headerCloseButton = void 0;
  if (app.closeDisclosure) {
    headerCloseButton = _react2.default.createElement(_terraButton2.default, { style: { marginLeft: '5px' }, onClick: function onClick() {
        app.closeDisclosure();
      }, icon: _react2.default.createElement(_IconClose2.default, null) });
  }

  var headerBackButton = void 0;
  if (app.goBack) {
    headerBackButton = _react2.default.createElement(_terraButton2.default, { onClick: function onClick() {
        app.goBack();
      }, icon: _react2.default.createElement(_IconLeft2.default, null) });
  }

  var maximizeButton = void 0;
  if (app.maximize) {
    maximizeButton = _react2.default.createElement(_terraButton2.default, { onClick: function onClick() {
        app.maximize();
      }, icon: _react2.default.createElement(_IconMaximize2.default, null) });
  }

  var className = 'terra-NavigationHeader';
  if (hasBottomBorder) {
    className = className + ' terra-NavigationHeader--borderBottom';
  }

  return _react2.default.createElement(
    'header',
    { className: className },
    _react2.default.createElement(
      'span',
      { className: 'terra-NavigationHeader-start' },
      headerBackButton,
      maximizeButton,
      _react2.default.createElement(
        'h2',
        null,
        title
      )
    ),
    _react2.default.createElement(
      'span',
      { className: 'terra-NavigationHeader-end' },
      children,
      headerCloseButton
    )
  );
};

NavigationHeader.propTypes = {
  title: _react.PropTypes.string,
  children: _react.PropTypes.node,
  app: _AppDelegate2.default.propType,
  hasBottomBorder: _react.PropTypes.bool
};

exports.default = NavigationHeader;