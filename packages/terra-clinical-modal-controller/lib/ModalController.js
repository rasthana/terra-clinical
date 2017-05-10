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

var _modalController = require('./reducers/modalController');

var _modalController2 = _interopRequireDefault(_modalController);

var _modalController3 = require('./actions/modalController');

var _ModalPresenter = require('./ModalPresenter');

var _ModalPresenter2 = _interopRequireDefault(_ModalPresenter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalController = function (_React$Component) {
  _inherits(ModalController, _React$Component);

  function ModalController(props) {
    _classCallCheck(this, ModalController);

    var _this = _possibleConstructorReturn(this, (ModalController.__proto__ || Object.getPrototypeOf(ModalController)).call(this, props));

    _this.componentsFromModalState = _this.componentsFromModalState.bind(_this);
    return _this;
  }

  _createClass(ModalController, [{
    key: 'componentsFromModalState',
    value: function componentsFromModalState() {
      var _this2 = this;

      if (!this.props.componentKeys || !this.props.componentKeys.length) {
        return null;
      }

      return this.props.componentKeys.map(function (componentKey, index) {
        var componentData = _this2.props.componentDirectory[componentKey];

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
          goBack: index > 0 ? function () {
            _this2.props.popModal();
          } : null,
          maximize: !_this2.props.isMaximized ? function () {
            _this2.props.maximizeModal();
          } : null,
          minimize: _this2.props.isMaximized ? function () {
            _this2.props.minimizeModal();
          } : null
        });

        return _react2.default.createElement(ComponentClass, _extends({ key: componentKey }, componentData.props, { app: appDelegate }));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          app = _props.app,
          discloseModal = _props.discloseModal,
          size = _props.size,
          isOpen = _props.isOpen,
          isMaximized = _props.isMaximized,
          children = _props.children;


      return _react2.default.createElement(
        _ModalPresenter2.default,
        {
          componentStack: this.componentsFromModalState(),
          size: size,
          isOpen: isOpen,
          isMaximized: isMaximized
        },
        _react2.default.Children.map(children, function (child) {
          var childAppDelegate = _terraClinicalAppDelegate2.default.createDescendant(app, {
            disclose: function disclose(data) {
              discloseModal(data);
            }
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

  componentKeys: _react.PropTypes.array,
  componentDirectory: _react.PropTypes.object,
  size: _react.PropTypes.string,
  isOpen: _react.PropTypes.bool,
  isMaximized: _react.PropTypes.bool,

  discloseModal: _react.PropTypes.func,
  dismissModal: _react.PropTypes.func,
  pushModal: _react.PropTypes.func,
  popModal: _react.PropTypes.func,
  maximizeModal: _react.PropTypes.func,
  minimizeModal: _react.PropTypes.func
};

var mapStateToProps = function mapStateToProps(state) {
  return function (disclosureState) {
    return {
      componentKeys: disclosureState.componentKeys,
      componentDirectory: disclosureState.components,
      size: disclosureState.size,
      isOpen: disclosureState.isOpen,
      isMaximized: disclosureState.isMaximized
    };
  }(state.modalController);
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
    maximizeModal: function maximizeModal(data) {
      dispatch((0, _modalController3.maximize)(data));
    },
    minimizeModal: function minimizeModal(data) {
      dispatch((0, _modalController3.minimize)(data));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ModalController);


var reducers = {
  modalController: _modalController2.default
};

exports.reducers = reducers;