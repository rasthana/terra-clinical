'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _xfc = require('xfc');

var _AppDelegate = require('../../navigation/core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bootstrappedAppDelegate = function bootstrappedAppDelegate(data) {
  return _AppDelegate2.default.create({
    disclose: function disclose(options) {
      _xfc.Provider.trigger('providerApplication.disclose', { options: options });
    },
    dismiss: data.navigator.dismiss ? function (options) {
      _xfc.Provider.trigger('providerApplication.dismiss', { options: options });
    } : null,
    closeDisclosure: data.navigator.closeDisclosure ? function (options) {
      _xfc.Provider.trigger('providerApplication.closeDisclosure', { options: options });
    } : null,
    maximize: data.navigator.maximize ? function (options) {
      _xfc.Provider.trigger('providerApplication.maximize', { options: options });
    } : null,
    canGoBack: data.navigator.canGoBack,
    isMaximized: data.navigator.isMaximized
  });
};

var EmbeddedContentProvider = function (_React$Component) {
  _inherits(EmbeddedContentProvider, _React$Component);

  function EmbeddedContentProvider(props) {
    _classCallCheck(this, EmbeddedContentProvider);

    var _this = _possibleConstructorReturn(this, (EmbeddedContentProvider.__proto__ || Object.getPrototypeOf(EmbeddedContentProvider)).call(this, props));

    _this.state = {
      isProviderReady: false,
      appDelegate: undefined
    };
    return _this;
  }

  _createClass(EmbeddedContentProvider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _xfc.Provider.init({
        acls: this.props.acls,
        secret: this.props.secret,
        onReady: function onReady() {
          _this2.setState({ isProviderReady: true });

          _xfc.Provider.on('consumerApplication.bootstrap', function (data) {
            _this2.setState({
              appDelegate: bootstrappedAppDelegate(data)
            });
          });

          _xfc.Provider.trigger('providerApplication.mounted', { navigationSupported: true });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.isProviderReady) {
        return null;
      }

      return _react2.default.cloneElement(this.props.content, { app: this.state.appDelegate });
    }
  }]);

  return EmbeddedContentProvider;
}(_react2.default.Component);

EmbeddedContentProvider.propTypes = {
  content: _react.PropTypes.node,
  acls: _react.PropTypes.array,
  secret: _react.PropTypes.func
};

EmbeddedContentProvider.defaultProps = {
  acls: ['*'],
  secret: function secret() {
    return Promise.resolve('Success');
  }
};

exports.default = EmbeddedContentProvider;