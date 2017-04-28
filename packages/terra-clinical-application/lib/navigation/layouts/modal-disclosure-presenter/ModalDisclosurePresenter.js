'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _NavStack = require('../../../generic-components/nav-stack/NavStack');

var _NavStack2 = _interopRequireDefault(_NavStack);

require('./ModalDisclosurePresenter.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalDisclosurePresenter = function (_React$Component) {
  _inherits(ModalDisclosurePresenter, _React$Component);

  function ModalDisclosurePresenter() {
    _classCallCheck(this, ModalDisclosurePresenter);

    return _possibleConstructorReturn(this, (ModalDisclosurePresenter.__proto__ || Object.getPrototypeOf(ModalDisclosurePresenter)).apply(this, arguments));
  }

  _createClass(ModalDisclosurePresenter, [{
    key: 'render',
    value: function render() {
      var modalState = this.props.modalState;

      var modalClassNames = (0, _classnames2.default)(['terra-ModalDisclosurePresenter-modal', { 'terra-ModalDisclosurePresenter-modal--small': !modalState.isMaximized && (modalState.size === 'small' || !modalState.size) }, { 'terra-ModalDisclosurePresenter-modal--large': !modalState.isMaximized && modalState.size === 'large' }, { 'terra-ModalDisclosurePresenter-modal--fullscreen': modalState.isMaximized }]);

      return _react2.default.createElement(
        'div',
        { className: 'terra-ModalDisclosurePresenter' },
        this.props.children,
        _react2.default.createElement(
          _reactModal2.default,
          {
            isOpen: modalState.isOpen,
            className: modalClassNames,
            overlayClassName: 'terra-ModalDisclosurePresenter-modalOverlay',
            contentLabel: ''
          },
          _react2.default.createElement(_NavStack2.default, { items: modalState.componentStack })
        )
      );
    }
  }]);

  return ModalDisclosurePresenter;
}(_react2.default.Component);

ModalDisclosurePresenter.propTypes = {
  children: _react.PropTypes.node,
  modalState: _react.PropTypes.object
};

exports.default = ModalDisclosurePresenter;