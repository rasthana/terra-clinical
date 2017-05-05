'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducers = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _terraClinicalAppDelegate = require('terra-clinical-app-delegate');

var _terraClinicalAppDelegate2 = _interopRequireDefault(_terraClinicalAppDelegate);

var _ModalPresenter = require('./ModalPresenter');

var _ModalPresenter2 = _interopRequireDefault(_ModalPresenter);

var _modalController = require('./reducers/modalController');

var _modalController2 = _interopRequireDefault(_modalController);

var _modalController3 = require('./actions/modalController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalController = function (_React$Component) {
  _inherits(ModalController, _React$Component);

  function ModalController(props) {
    _classCallCheck(this, ModalController);

    var _this = _possibleConstructorReturn(this, (ModalController.__proto__ || Object.getPrototypeOf(ModalController)).call(this, props));

    _this.dataForModalState = _this.dataForModalState.bind(_this);
    return _this;
  }

  _createClass(ModalController, [{
    key: 'dataForModalState',
    value: function dataForModalState() {
      var _this2 = this;

      var modalState = this.props.modalState;

      if (!modalState.isOpen) {
        return {
          isOpen: false,
          components: undefined
        };
      }

      var components = modalState.componentKeys.map(function (componentKey, index) {
        var componentData = modalState.components[componentKey];

        var ComponentClass = _terraClinicalAppDelegate2.default.getComponent(componentData.name);

        if (!ComponentClass) {
          return undefined;
        }

        var appDelegate = _terraClinicalAppDelegate2.default.create({
          disclose: function disclose(data) {
            _this2.props.pushModal(data);
          },
          dismiss: index > 0 ? function () {
            _this2.props.popModal();
          } : function () {
            _this2.props.dismissModal();
          },
          closeDisclosure: function closeDisclosure() {
            _this2.props.dismissModal();
          },
          maximize: function maximize() {
            _this2.props.toggleMaximizeModal();
          },
          canGoBack: index > 0,
          isMaximized: modalState.isMaximized,
          disclosedAs: 'modal',
          availableDisclosureTypes: 'modal'
        });

        return _react2.default.createElement(ComponentClass, _extends({ key: componentKey }, componentData.props, { app: appDelegate }));
      });

      return {
        isOpen: true,
        isMaximized: modalState.isMaximized,
        componentStack: components,
        size: modalState.size
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          app = _props.app,
          modalState = _props.modalState,
          discloseModal = _props.discloseModal,
          dismissModal = _props.dismissModal,
          pushModal = _props.pushModal,
          popModal = _props.popModal,
          maximizeModal = _props.maximizeModal,
          children = _props.children;


      return _react2.default.createElement(
        _ModalPresenter2.default,
        { modalState: this.dataForModalState() },
        _react2.default.Children.map(children, function (child) {
          var childAppDelegate = _terraClinicalAppDelegate2.default.create({
            disclose: function disclose(data) {
              discloseModal(data);
            },
            dismiss: app && app.dismiss,
            closeDisclosure: app && app.closeDisclosure,
            maximize: app && app.maximize,
            isMaximized: app && app.isMaximized,
            canGoBack: app && app.canGoBack,
            disclosedAs: app && app.disclosedAs,
            availableDisclosureTypes: _extends([], app && app.availableDisclosureTypes, ['modal'])
          });

          return _react2.default.cloneElement(child, { app: childAppDelegate });
        })
      );
    }
  }]);

  return ModalController;
}(_react2.default.Component);

ModalController.propTypes = {
  app: _terraClinicalAppDelegate2.default.propType,
  children: _react.PropTypes.node,
  modalState: _react.PropTypes.object,
  discloseModal: _react.PropTypes.func,
  dismissModal: _react.PropTypes.func,
  pushModal: _react.PropTypes.func,
  popModal: _react.PropTypes.func,
  toggleMaximizeModal: _react.PropTypes.func
};

var mapStateToProps = function mapStateToProps(state) {
  return { modalState: state.modalController };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    discloseModal: function discloseModal(data) {
      dispatch((0, _modalController3.disclose)(data));
    },
    dismissModal: function dismissModal(data) {
      dispatch((0, _modalController3.dismiss)(data));
    },
    pushModal: function pushModal(data) {
      dispatch((0, _modalController3.push)(data));
    },
    popModal: function popModal(data) {
      dispatch((0, _modalController3.pop)(data));
    },
    toggleMaximizeModal: function toggleMaximizeModal(data) {
      dispatch((0, _modalController3.toggleMaximize)(data));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ModalController);


var reducers = {
  modalController: _modalController2.default
};

exports.reducers = reducers;