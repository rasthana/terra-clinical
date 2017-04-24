'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppDelegate = require('../../navigation/core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

var _NavigationHeader = require('../../navigation/core/navigation-header/NavigationHeader');

var _NavigationHeader2 = _interopRequireDefault(_NavigationHeader);

var _ContentContainer = require('../../generic-components/content-container/ContentContainer');

var _ContentContainer2 = _interopRequireDefault(_ContentContainer);

var _PatientStore = require('../patient-list/data/PatientStore');

var _PatientStore2 = _interopRequireDefault(_PatientStore);

var _PatientDetail = require('./PatientDetail');

var _PatientDetail2 = _interopRequireDefault(_PatientDetail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PatientDetailLoader = function (_React$Component) {
  _inherits(PatientDetailLoader, _React$Component);

  function PatientDetailLoader(props) {
    _classCallCheck(this, PatientDetailLoader);

    var _this = _possibleConstructorReturn(this, (PatientDetailLoader.__proto__ || Object.getPrototypeOf(PatientDetailLoader)).call(this, props));

    _this.state = {
      isLoading: false,
      patientDetailData: props.patientDetailData
    };

    _this.getData = _this.getData.bind(_this);
    _this.onRefresh = _this.onRefresh.bind(_this);
    _this.defaultPlaceholderComponent = _this.defaultPlaceholderComponent.bind(_this);
    return _this;
  }

  _createClass(PatientDetailLoader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.state.patientDetailData) {
        this.getData();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.getDataTimeout);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ patientDetailData: nextProps.patientDetailData });
    }
  }, {
    key: 'getData',
    value: function getData() {
      var _this2 = this;

      this.setState({ isLoading: true });

      // GET DATA WITH URL
      this.getDataTimeout = setTimeout(function () {
        var patientDetailData = { patient: _PatientStore2.default.getPatient('physician1', _this2.props.url) };

        _this2.setState({ patientDetailData: patientDetailData, isLoading: false });
      }, 3000);
    }
  }, {
    key: 'onRefresh',
    value: function onRefresh() {
      this.getData();
    }
  }, {
    key: 'defaultPlaceholderComponent',
    value: function defaultPlaceholderComponent() {
      return _react2.default.createElement(
        _ContentContainer2.default,
        {
          header: _react2.default.createElement(_NavigationHeader2.default, { title: 'Patient Detail Placeholder', app: this.props.app }),
          fill: true
        },
        _react2.default.createElement(
          'h2',
          null,
          'Loading...'
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          app = _props.app,
          patientDetailData = _props.patientDetailData,
          url = _props.url,
          customProps = _objectWithoutProperties(_props, ['app', 'patientDetailData', 'url']);

      if (!this.state.patientDetailData) {
        return this.defaultPlaceholderComponent();
      } else {
        return _react2.default.createElement(_PatientDetail2.default, _extends({}, customProps, {
          app: app,
          data: this.state.patientDetailData,
          isLoading: this.state.isLoading,
          onRefresh: this.onRefresh,
          onSelectPatientUpdate: this.props.onSelectPatientUpdate
        }));
      }
    }
  }]);

  return PatientDetailLoader;
}(_react2.default.Component);

PatientDetailLoader.propTypes = {
  app: _AppDelegate2.default.propType,
  patientDetailData: _react.PropTypes.object,
  url: _react.PropTypes.string,
  placeholderComponent: _react.PropTypes.node,
  onSelectPatientUpdate: _react.PropTypes.func
};

exports.default = PatientDetailLoader;