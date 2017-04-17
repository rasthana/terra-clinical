'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _terraSlidePanel = require('terra-slide-panel');

var _terraSlidePanel2 = _interopRequireDefault(_terraSlidePanel);

var _AppDelegate = require('../../core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

var _NavStack = require('../../../generic-components/nav-stack/NavStack');

var _NavStack2 = _interopRequireDefault(_NavStack);

var _NavigatorUtils = require('../../core/util/NavigatorUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlidePanelLayout = function (_React$Component) {
  _inherits(SlidePanelLayout, _React$Component);

  function SlidePanelLayout(props) {
    _classCallCheck(this, SlidePanelLayout);

    var _this = _possibleConstructorReturn(this, (SlidePanelLayout.__proto__ || Object.getPrototypeOf(SlidePanelLayout)).call(this, props));

    _this.mainDisclose = _this.mainDisclose.bind(_this);
    _this.mainDismiss = _this.mainDismiss.bind(_this);
    _this.pushMainComponent = _this.pushMainComponent.bind(_this);
    _this.popMainComponent = _this.popMainComponent.bind(_this);

    _this.panelDisclose = _this.panelDisclose.bind(_this);
    _this.openSlidePanel = _this.openSlidePanel.bind(_this);
    _this.closeSlidePanel = _this.closeSlidePanel.bind(_this);
    _this.pushSlidePanelComponent = _this.pushSlidePanelComponent.bind(_this);
    _this.popSlidePanelComponent = _this.popSlidePanelComponent.bind(_this);
    _this.maximizeSlidePanel = _this.maximizeSlidePanel.bind(_this);

    _this.state = {
      slidePanel: {
        isOpen: false,
        size: 'small',
        behavior: 'squish',
        componentStack: []
      },
      main: {
        componentStack: _react2.default.Children.map(props.children, function (component, index) {
          var appDelegate = new _AppDelegate2.default({
            disclose: _this.mainDisclose,
            dismiss: index > 0 ? _this.mainDismiss : _this.popMainComponent,
            closeDisclosure: undefined,
            goBack: index > 0 ? _this.popMainComponent : undefined
          });

          return _react2.default.cloneElement(component, { app: appDelegate });
        })
      }
    };
    return _this;
  }

  _createClass(SlidePanelLayout, [{
    key: 'maximizeSlidePanel',
    value: function maximizeSlidePanel() {
      var isSlidePanelMaximized = this.state.slidePanel.isFullscreen;

      var newState = _extends({}, this.state.slidePanel);
      newState.isFullscreen = !isSlidePanelMaximized;

      this.setState({ slidePanel: newState });
    }
  }, {
    key: 'mainDisclose',
    value: function mainDisclose(options) {
      if (options.preferredType === 'panel') {
        this.openSlidePanel(options);
      } else if (options.preferredType === 'main') {
        this.pushMainComponent(options);
      } else if (this.props.app && this.props.app.disclose) {
        this.props.app.disclose(options);
      } else {
        this.openSlidePanel(options);
      }
    }
  }, {
    key: 'mainDismiss',
    value: function mainDismiss(options) {
      if (this.props.app && this.props.app.dismiss) {
        this.props.app.dismiss(options);
      }
    }
  }, {
    key: 'pushMainComponent',
    value: function pushMainComponent(options) {
      var newContent = (0, _NavigatorUtils.componentFromDiscloseOptions)(options);
      if (!newContent) {
        return;
      }

      var newComponentStack = _extends([], this.state.main.componentStack);

      var appDelegate = new _AppDelegate2.default({
        disclose: this.mainDisclose,
        dismiss: this.popMainComponent,
        closeDisclosure: undefined,
        goBack: this.popMainComponent
      });

      newComponentStack.push(_react2.default.cloneElement(newContent, { app: appDelegate }));

      this.closeSlidePanel();

      this.setState({
        main: {
          componentStack: newComponentStack
        }
      });
    }
  }, {
    key: 'popMainComponent',
    value: function popMainComponent() {
      if (this.state.main.componentStack.length <= 1) {
        return;
      }

      var newComponentStack = _extends([], this.state.main.componentStack);
      newComponentStack.pop();

      this.closeSlidePanel();

      this.setState({
        main: {
          componentStack: newComponentStack
        }
      });
    }
  }, {
    key: 'panelDisclose',
    value: function panelDisclose(options) {
      if (options.preferredType === 'panel' || options.preferredType === 'main') {
        this.pushSlidePanelComponent(options);
      } else if (this.props.app) {
        this.props.app.disclose(options);
      } else {
        this.pushSlidePanelComponent(options);
      }
    }
  }, {
    key: 'openSlidePanel',
    value: function openSlidePanel(options) {
      var newContent = (0, _NavigatorUtils.componentFromDiscloseOptions)(options);
      if (!newContent) {
        return;
      }

      var appDelegate = new _AppDelegate2.default({
        disclose: this.panelDisclose,
        dismiss: this.closeSlidePanel,
        closeDisclosure: this.closeSlidePanel,
        maximize: this.maximizeSlidePanel
      });

      this.setState({
        slidePanel: {
          isOpen: true,
          behavior: options.panelBehavior || 'squish',
          size: options.size || 'small',
          componentStack: [_react2.default.cloneElement(newContent, { app: appDelegate })]
        }
      });
    }
  }, {
    key: 'closeSlidePanel',
    value: function closeSlidePanel() {
      if (!this.state.slidePanel.isOpen) {
        return;
      }

      this.setState({
        slidePanel: {
          isOpen: false,
          behavior: 'squish',
          size: 'small',
          componentStack: []
        }
      });
    }
  }, {
    key: 'pushSlidePanelComponent',
    value: function pushSlidePanelComponent(options) {
      var newContent = (0, _NavigatorUtils.componentFromDiscloseOptions)(options);
      if (!newContent) {
        return;
      }

      var newComponentStack = _extends([], this.state.slidePanel.componentStack);

      var appDelegate = new _AppDelegate2.default({
        disclose: this.panelDisclose,
        dismiss: this.popSlidePanelComponent,
        closeDisclosure: this.closeSlidePanel,
        goBack: this.popSlidePanelComponent,
        maximize: this.maximizeSlidePanel
      });

      newComponentStack.push(_react2.default.cloneElement(newContent, { app: appDelegate }));

      this.setState({
        slidePanel: _extends({}, this.state.slidePanel, { componentStack: newComponentStack })
      });
    }
  }, {
    key: 'popSlidePanelComponent',
    value: function popSlidePanelComponent() {
      if (this.state.slidePanel.componentStack.length > 1) {
        var newComponentStack = _extends([], this.state.slidePanel.componentStack);

        newComponentStack.pop();

        this.setState({
          slidePanel: _extends({}, this.state.slidePanel, { componentStack: newComponentStack })
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_terraSlidePanel2.default, {
        className: 'orion-SlidePanelLayout',
        mainContent: _react2.default.createElement(
          _NavStack2.default,
          { animationIsDisabled: true },
          this.state.main.componentStack
        ),
        panelContent: _react2.default.createElement(
          _NavStack2.default,
          null,
          this.state.slidePanel.componentStack
        ),
        isOpen: this.state.slidePanel.isOpen,
        panelBehavior: this.state.slidePanel.behavior,
        panelSize: this.state.slidePanel.size,
        panelPosition: 'end',
        isFullscreen: this.state.slidePanel.isFullscreen,
        fill: true
      });
    }
  }]);

  return SlidePanelLayout;
}(_react2.default.Component);

SlidePanelLayout.propTypes = {
  children: _react.PropTypes.node,
  app: _react.PropTypes.instanceOf(_AppDelegate2.default)
};

exports.default = SlidePanelLayout;