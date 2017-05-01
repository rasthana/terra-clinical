'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _terraSlidePanel = require('terra-slide-panel');

var _terraSlidePanel2 = _interopRequireDefault(_terraSlidePanel);

var _NavStack = require('../../../generic-components/nav-stack/NavStack');

var _NavStack2 = _interopRequireDefault(_NavStack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PanelDisclosurePresenter = function (_React$Component) {
  _inherits(PanelDisclosurePresenter, _React$Component);

  function PanelDisclosurePresenter() {
    _classCallCheck(this, PanelDisclosurePresenter);

    return _possibleConstructorReturn(this, (PanelDisclosurePresenter.__proto__ || Object.getPrototypeOf(PanelDisclosurePresenter)).apply(this, arguments));
  }

  _createClass(PanelDisclosurePresenter, [{
    key: 'render',
    value: function render() {
      var panelState = this.props.panelState;

      return _react2.default.createElement(_terraSlidePanel2.default, {
        mainContent: this.props.children,
        panelContent: _react2.default.createElement(_NavStack2.default, { items: panelState.componentStack }),
        isOpen: panelState.isOpen,
        panelBehavior: panelState.behavior,
        panelSize: panelState.size,
        panelPosition: 'end',
        isFullscreen: panelState.isMaximized,
        fill: true
      });
    }
  }]);

  return PanelDisclosurePresenter;
}(_react2.default.Component);

PanelDisclosurePresenter.propTypes = {
  children: _react.PropTypes.node,
  panelState: _react.PropTypes.object
};

exports.default = PanelDisclosurePresenter;