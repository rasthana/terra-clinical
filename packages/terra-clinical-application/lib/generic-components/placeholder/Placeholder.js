'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ContentContainer = require('../content-container/ContentContainer');

var _ContentContainer2 = _interopRequireDefault(_ContentContainer);

var _AppDelegate = require('../../navigation/core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

var _NavigationHeader = require('../../navigation/core/navigation-header/NavigationHeader');

var _NavigationHeader2 = _interopRequireDefault(_NavigationHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
  app: _AppDelegate2.default.propType,
  headerText: _react.PropTypes.string,
  loadingText: _react.PropTypes.string
};

var defaultProps = {
  headerText: 'Placeholder',
  loadingText: 'Loading'
};

var Placeholder = function Placeholder(props) {
  return _react2.default.createElement(
    _ContentContainer2.default,
    {
      header: _react2.default.createElement(_NavigationHeader2.default, { title: props.headerText, app: props.app }),
      fill: true
    },
    _react2.default.createElement(
      'h2',
      null,
      props.loadingText
    )
  );
};

Placeholder.propTypes = propTypes;
Placeholder.defaultProps = defaultProps;

exports.default = Placeholder;