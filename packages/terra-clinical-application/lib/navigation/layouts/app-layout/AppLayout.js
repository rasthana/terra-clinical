'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _AppDelegate = require('../../core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

var _NavigationHeader = require('../../core/navigation-header/NavigationHeader');

var _NavigationHeader2 = _interopRequireDefault(_NavigationHeader);

var _ContentContainer = require('../../../generic-components/content-container/ContentContainer');

var _ContentContainer2 = _interopRequireDefault(_ContentContainer);

var _NavStack = require('../../../generic-components/nav-stack/NavStack');

var _NavStack2 = _interopRequireDefault(_NavStack);

var _NavigatorUtils = require('../../core/util/NavigatorUtils');

require('./AppLayout.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppLayout = function (_React$Component) {
  _inherits(AppLayout, _React$Component);

  function AppLayout(props) {
    _classCallCheck(this, AppLayout);

    var _this = _possibleConstructorReturn(this, (AppLayout.__proto__ || Object.getPrototypeOf(AppLayout)).call(this, props));

    _this.modalShouldBeFullscreen = false;

    _this.updateFullscreenState = _this.updateFullscreenState.bind(_this);
    _this.childDisclose = _this.childDisclose.bind(_this);
    _this.childDismiss = _this.childDismiss.bind(_this);

    _this.open = _this.open.bind(_this);
    _this.close = _this.close.bind(_this);
    _this.push = _this.push.bind(_this);
    _this.pop = _this.pop.bind(_this);

    _this.state = {
      isOpen: false,
      isFullscreen: false,
      size: 'small',
      componentStack: []
    };
    return _this;
  }

  _createClass(AppLayout, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.updateFullscreenState();

      window.addEventListener('resize', function () {
        _this2.updateFullscreenState();
      });
    }
  }, {
    key: 'updateFullscreenState',
    value: function updateFullscreenState() {
      var currentFullscreenValue = this.modalShouldBeFullscreen;

      this.modalShouldBeFullscreen = window.innerWidth < 1024;

      if (this.state.isOpen && currentFullscreenValue !== this.modalShouldBeFullscreen) {
        this.forceUpdate();
      }
    }
  }, {
    key: 'childDisclose',
    value: function childDisclose(options) {
      if (options.fallbackUrl) {
        if (this.props.app && this.props.app.disclose) {
          var modifiedOptions = _extends({}, options);
          modifiedOptions.content = undefined;

          this.props.app.disclose(modifiedOptions);

          return;
        }
      }

      this.open(options);
    }
  }, {
    key: 'childDismiss',
    value: function childDismiss(options) {
      if (this.props.app && this.props.app.dismiss) {
        this.props.app.dismiss(options);
      }
    }
  }, {
    key: 'open',
    value: function open(options) {
      var newContent = (0, _NavigatorUtils.componentFromDiscloseOptions)(options);
      if (!newContent) {
        return;
      }

      var appDelegate = new _AppDelegate2.default({
        disclose: this.push,
        dismiss: this.close,
        closeDisclosure: this.close,
        goBack: undefined
      });

      var newState = {
        isOpen: true,
        size: options.size || 'small',
        componentStack: [_react2.default.cloneElement(newContent, { app: appDelegate })]
      };

      this.setState(newState);
    }
  }, {
    key: 'close',
    value: function close() {
      var newState = {
        isOpen: false,
        size: 'small',
        componentStack: []
      };

      this.setState(newState);
    }
  }, {
    key: 'push',
    value: function push(options) {
      var newContent = (0, _NavigatorUtils.componentFromDiscloseOptions)(options);
      if (!newContent) {
        return;
      }

      var newComponentStack = _extends([], this.state.componentStack);

      var appDelegate = new _AppDelegate2.default({
        disclose: this.push,
        dismiss: this.pop,
        closeDisclosure: this.close,
        goBack: this.pop
      });

      newComponentStack.push(_react2.default.cloneElement(newContent, { app: appDelegate }));

      var newState = {
        componentStack: newComponentStack
      };

      this.setState(newState);
    }
  }, {
    key: 'pop',
    value: function pop() {
      if (this.state.componentStack.length > 1) {
        var newComponentStack = _extends([], this.state.componentStack);

        newComponentStack.pop();

        var newState = {
          componentStack: newComponentStack
        };

        this.setState(newState);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var modalClassNames = (0, _classnames2.default)(['terra-AppLayout-modal', { 'terra-AppLayout-modal--small': !this.modalShouldBeFullscreen && this.state.size === 'small' }, { 'terra-AppLayout-modal--large': !this.modalShouldBeFullscreen && this.state.size === 'large' }, { 'terra-AppLayout-modal--fullscreen': this.modalShouldBeFullscreen }]);

      return _react2.default.createElement(
        'div',
        { className: 'terra-AppLayout' },
        _react2.default.Children.map(this.props.children, function (child) {
          var appDelegate = _AppDelegate2.default.mergeDelegate(_this3.props.app, {
            disclose: _this3.childDisclose,
            dismiss: _this3.close
          });

          return _react2.default.cloneElement(child, { app: appDelegate });
        }),
        _react2.default.createElement(
          _reactModal2.default,
          {
            isOpen: this.state.isOpen,
            className: modalClassNames,
            overlayClassName: 'terra-AppLayout-modalOverlay',
            contentLabel: ''
          },
          _react2.default.createElement(
            _NavStack2.default,
            null,
            this.state.componentStack
          )
        )
      );
    }
  }]);

  return AppLayout;
}(_react2.default.Component);

AppLayout.propTypes = {
  children: _react.PropTypes.node,
  app: _react.PropTypes.instanceOf(_AppDelegate2.default)
};

exports.default = AppLayout;