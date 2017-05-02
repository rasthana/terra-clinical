'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appDelegateKey = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _xfc = require('xfc');

var _NavigationHeader = require('../../navigation/core/navigation-header/NavigationHeader');

var _NavigationHeader2 = _interopRequireDefault(_NavigationHeader);

var _ContentContainer = require('../../generic-components/content-container/ContentContainer');

var _ContentContainer2 = _interopRequireDefault(_ContentContainer);

var _AppDelegate = require('../../navigation/core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

require('./EmbeddedContentConsumer.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EmbeddedContentConsumer = function (_React$Component) {
  _inherits(EmbeddedContentConsumer, _React$Component);

  function EmbeddedContentConsumer(props) {
    _classCallCheck(this, EmbeddedContentConsumer);

    var _this = _possibleConstructorReturn(this, (EmbeddedContentConsumer.__proto__ || Object.getPrototypeOf(EmbeddedContentConsumer)).call(this, props));

    _this.state = {
      contentSupportsNavigation: true
    };

    _this.bootstrapFrame = _this.bootstrapFrame.bind(_this);
    _this.providerMounted = _this.providerMounted.bind(_this);

    _this.providerDisclose = _this.providerDisclose.bind(_this);
    _this.providerDismiss = _this.providerDismiss.bind(_this);
    _this.providerCloseDisclosure = _this.providerCloseDisclosure.bind(_this);
    _this.providerMaximize = _this.providerMaximize.bind(_this);
    return _this;
  }

  _createClass(EmbeddedContentConsumer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.embeddedContentWrapper) {
        this.xfcFrame = _xfc.Consumer.mount(this.embeddedContentWrapper, this.props.src);

        this.xfcFrame.on('providerApplication.mounted', this.providerMounted);

        this.xfcFrame.on('providerApplication.disclose', this.providerDisclose);
        this.xfcFrame.on('providerApplication.dismiss', this.providerDismiss);
        this.xfcFrame.on('providerApplication.closeDisclosure', this.providerCloseDisclosure);
        this.xfcFrame.on('providerApplication.maximize', this.providerMaximize);

        // Set a timeout to switch the navigation support state flag to false. We don't want to set this immediately,
        // but if the consumer does not provide navigation support data in 5 seconds, we'll display our header to
        // ensure the user can close the disclosure.
        this.fallbackHeaderTimeout = setTimeout(function () {
          _this2.setState({ contentSupportsNavigation: false });
        }, 5000);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // This might be too heavy to do every update. We might want to compare app delegates and only bootstrap
      // when changes ocurred.
      this.bootstrapFrame();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.fallbackHeaderTimeout);

      if (this.xfcFrame) {
        this.xfcFrame.removeAllListeners('providerApplication.mounted');
        this.xfcFrame.removeAllListeners('providerApplication.disclose');
        this.xfcFrame.removeAllListeners('providerApplication.dismiss');
        this.xfcFrame.removeAllListeners('providerApplication.maximize');
      }
    }
  }, {
    key: 'bootstrapFrame',
    value: function bootstrapFrame() {
      this.xfcFrame.trigger('consumerApplication.bootstrap', {
        navigator: {
          disclose: true,
          dismiss: this.props.app.dismiss !== undefined,
          closeDisclosure: this.props.app.closeDisclosure !== undefined,
          maximize: this.props.app.maximize !== undefined,
          canGoBack: this.props.app.canGoBack,
          isMaximized: this.props.app.isMaximized
        }
      });
    }
  }, {
    key: 'providerMounted',
    value: function providerMounted(data) {
      // Since the provider responded, we clear the timeout and use the value given in the payload to determine support.
      clearTimeout(this.fallbackHeaderTimeout);

      this.setState({ contentSupportsNavigation: data.navigationSupported });

      this.bootstrapFrame();
    }
  }, {
    key: 'providerDisclose',
    value: function providerDisclose(data) {
      this.props.app.disclose(data.options);
    }
  }, {
    key: 'providerDismiss',
    value: function providerDismiss(data) {
      this.props.app.dismiss(data.options);
    }
  }, {
    key: 'providerCloseDisclosure',
    value: function providerCloseDisclosure(data) {
      this.props.app.closeDisclosure(data.options);
    }
  }, {
    key: 'providerMaximize',
    value: function providerMaximize(data) {
      this.props.app.maximize(data.options);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var app = this.props.app;


      return _react2.default.createElement(
        _ContentContainer2.default,
        {
          header: !this.state.contentSupportsNavigation && _react2.default.createElement(_NavigationHeader2.default, { app: app, hasBottomBorder: true }),
          fill: true
        },
        _react2.default.createElement('div', {
          className: 'terra-EmbeddedContentConsumer',
          ref: function ref(element) {
            _this3.embeddedContentWrapper = element;
          }
        })
      );
    }
  }]);

  return EmbeddedContentConsumer;
}(_react2.default.Component);

EmbeddedContentConsumer.propTypes = {
  src: _react.PropTypes.string,
  app: _AppDelegate2.default.propType
};

exports.default = EmbeddedContentConsumer;


var appDelegateKey = 'EmbeddedContentConsumer';
_AppDelegate2.default.registerComponent(appDelegateKey, EmbeddedContentConsumer);
exports.appDelegateKey = appDelegateKey;