'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppDelegate = require('../../core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

var _ContentContainer = require('../../../generic-components/content-container/ContentContainer');

var _ContentContainer2 = _interopRequireDefault(_ContentContainer);

require('./PrimaryNavLayout.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Button from 'terra-button';

// import NavigationHeader from '../../core/navigation-header/NavigationHeader';


var PrimaryNavLayout = function (_React$Component) {
  _inherits(PrimaryNavLayout, _React$Component);

  function PrimaryNavLayout(props) {
    _classCallCheck(this, PrimaryNavLayout);

    var _this = _possibleConstructorReturn(this, (PrimaryNavLayout.__proto__ || Object.getPrototypeOf(PrimaryNavLayout)).call(this, props));

    _this.renderNavHeader = _this.renderNavHeader.bind(_this);
    return _this;
  }

  _createClass(PrimaryNavLayout, [{
    key: 'renderNavHeader',
    value: function renderNavHeader(headerTitle, headerButtons) {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'header',
          { className: 'orion-AppHeader' },
          _react2.default.createElement(
            'h1',
            { style: { paddingLeft: '10px' } },
            headerTitle
          ),
          headerButtons
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _ContentContainer2.default,
        {
          className: 'orion-PrimaryNavLayout',
          header: this.renderNavHeader(this.props.headerTitle, this.props.headerButtons),
          fill: this.props.fill
        },
        _react2.default.Children.map(this.props.children, function (child) {
          return _react2.default.cloneElement(child, { app: _this2.props.app });
        })
      );
    }
  }]);

  return PrimaryNavLayout;
}(_react2.default.Component);

PrimaryNavLayout.defaultProps = {
  navPanelIsOpen: true
};

PrimaryNavLayout.propTypes = {
  headerTitle: _react.PropTypes.string,
  headerButtons: _react.PropTypes.arrayOf(_react.PropTypes.node),
  children: _react.PropTypes.node,
  fill: _react.PropTypes.bool,
  app: _react.PropTypes.instanceOf(_AppDelegate2.default)
};

exports.default = PrimaryNavLayout;