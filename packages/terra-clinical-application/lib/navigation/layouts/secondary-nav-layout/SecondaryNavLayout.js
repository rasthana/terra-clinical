'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _terraSlidePanel = require('terra-slide-panel');

var _terraSlidePanel2 = _interopRequireDefault(_terraSlidePanel);

var _AppDelegate = require('../../core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

var _ContentContainer = require('../../../generic-components/content-container/ContentContainer');

var _ContentContainer2 = _interopRequireDefault(_ContentContainer);

require('./SecondaryNavLayout.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SecondaryNavLayout = function (_React$Component) {
  _inherits(SecondaryNavLayout, _React$Component);

  function SecondaryNavLayout(props) {
    _classCallCheck(this, SecondaryNavLayout);

    var _this = _possibleConstructorReturn(this, (SecondaryNavLayout.__proto__ || Object.getPrototypeOf(SecondaryNavLayout)).call(this, props));

    _this.renderNavigationSlidePanel = _this.renderNavigationSlidePanel.bind(_this);

    _this.state = {
      navPanel: {
        isOpen: true
      }
    };
    return _this;
  }

  // Rendering

  _createClass(SecondaryNavLayout, [{
    key: 'renderNavigationSlidePanel',
    value: function renderNavigationSlidePanel() {
      var _this2 = this;

      return _react2.default.createElement(_terraSlidePanel2.default, {
        panelPosition: 'start',
        isOpen: true,
        fill: true,
        panelBehavior: 'squish',
        panelContent: this.props.navPanelContent,
        mainContent: _react2.default.Children.map(this.props.children, function (child) {
          return _react2.default.cloneElement(child, { app: _this2.props.app });
        })
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)(['orion-SecondaryNavLayout']);

      return _react2.default.createElement(
        _ContentContainer2.default,
        {
          className: classes,
          header: this.props.header,
          fill: true
        },
        this.renderNavigationSlidePanel()
      );
    }
  }]);

  return SecondaryNavLayout;
}(_react2.default.Component);

SecondaryNavLayout.defaultProps = {
  navPanelIsOpen: true
};

SecondaryNavLayout.propTypes = {
  app: _AppDelegate2.default.propType,
  header: _react.PropTypes.node,
  navPanelIsOpen: _react.PropTypes.bool,
  navPanelContent: _react.PropTypes.node,
  children: _react.PropTypes.node
};

exports.default = SecondaryNavLayout;