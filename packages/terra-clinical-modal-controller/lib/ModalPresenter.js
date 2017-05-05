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

var _terraClinicalNavigationController = require('terra-clinical-navigation-controller');

var _terraClinicalNavigationController2 = _interopRequireDefault(_terraClinicalNavigationController);

require('./ModalPresenter.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalPresenter = function (_React$Component) {
  _inherits(ModalPresenter, _React$Component);

  function ModalPresenter() {
    _classCallCheck(this, ModalPresenter);

    return _possibleConstructorReturn(this, (ModalPresenter.__proto__ || Object.getPrototypeOf(ModalPresenter)).apply(this, arguments));
  }

  _createClass(ModalPresenter, [{
    key: 'render',
    value: function render() {
      var modalState = this.props.modalState;

      var modalClassNames = (0, _classnames2.default)(['terraClinical-ModalPresenter-modal', { 'terraClinical-ModalPresenter-modal--small': !modalState.isMaximized && (modalState.size === 'small' || !modalState.size) }, { 'terraClinical-ModalPresenter-modal--large': !modalState.isMaximized && modalState.size === 'large' }, { 'terraClinical-ModalPresenter-modal--fullscreen': modalState.isMaximized }]);

      return _react2.default.createElement(
        'div',
        { className: 'terraClinical-ModalPresenter' },
        this.props.children,
        _react2.default.createElement(
          _reactModal2.default,
          {
            isOpen: modalState.isOpen,
            className: modalClassNames,
            overlayClassName: 'terraClinical-ModalPresenter-modalOverlay',
            contentLabel: ''
          },
          _react2.default.createElement(_terraClinicalNavigationController2.default, { items: modalState.componentStack })
        )
      );
    }
  }]);

  return ModalPresenter;
}(_react2.default.Component);

ModalPresenter.propTypes = {
  children: _react.PropTypes.node,
  modalState: _react.PropTypes.object
};

exports.default = ModalPresenter;