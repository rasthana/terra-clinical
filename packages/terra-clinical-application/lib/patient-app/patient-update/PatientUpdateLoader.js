'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _terraButton = require('terra-button');

var _terraButton2 = _interopRequireDefault(_terraButton);

var _AppDelegate = require('../../navigation/core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

var _NavigationHeader = require('../../navigation/core/navigation-header/NavigationHeader');

var _NavigationHeader2 = _interopRequireDefault(_NavigationHeader);

var _ContentContainer = require('../../generic-components/content-container/ContentContainer');

var _ContentContainer2 = _interopRequireDefault(_ContentContainer);

var _PatientStore = require('../patient-list/data/PatientStore');

var _PatientStore2 = _interopRequireDefault(_PatientStore);

var _PatientUpdate = require('./PatientUpdate');

var _PatientUpdate2 = _interopRequireDefault(_PatientUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PatientUpdateLoader = function (_React$Component) {
  _inherits(PatientUpdateLoader, _React$Component);

  function PatientUpdateLoader(props) {
    _classCallCheck(this, PatientUpdateLoader);

    var _this = _possibleConstructorReturn(this, (PatientUpdateLoader.__proto__ || Object.getPrototypeOf(PatientUpdateLoader)).call(this, props));

    _this.defaultPlaceholderComponent = _this.defaultPlaceholderComponent.bind(_this);
    _this.getData = _this.getData.bind(_this);

    _this.state = {
      isLoading: false,
      patientUpdateData: props.patientUpdateData
    };
    return _this;
  }

  _createClass(PatientUpdateLoader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.state.patientUpdateData) {
        this.getData();
      }
    }
  }, {
    key: 'getData',
    value: function getData(url) {
      var _this2 = this;

      this.setState({ isLoading: true });

      // GET DATA WITH URL
      this.getDataTimeout = setTimeout(function () {
        debugger;

        var patientUpdateData = { patientUpdateData: _PatientStore2.default.getPatient('physician1', _this2.props.url) };

        _this2.setState({ patientUpdateData: patientUpdateData, isLoading: false });
      }, 3000);
    }
  }, {
    key: 'defaultPlaceholderComponent',
    value: function defaultPlaceholderComponent() {
      return _react2.default.createElement(
        _ContentContainer2.default,
        {
          header: _react2.default.createElement(_NavigationHeader2.default, { title: 'Patient Update Placeholder', app: this.props.app }),
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
      var patient = this.state.patientUpdateData;

      if (!patient) {
        return this.defaultPlaceholderComponent();
      }

      debugger;

      return _react2.default.createElement(_PatientUpdate2.default, {
        app: this.props.app,
        patient: patient,
        isLoading: this.state.isLoading,
        onSubmit: this.props.onSubmit,
        onCancel: this.props.onCancel
      });
    }
  }]);

  return PatientUpdateLoader;
}(_react2.default.Component);

PatientUpdateLoader.propTypes = {
  app: _AppDelegate2.default.propType,
  url: _react.PropTypes.string,
  patientUpdateData: _react.PropTypes.object,
  onSubmit: _react.PropTypes.func,
  onCancel: _react.PropTypes.func
};

exports.default = PatientUpdateLoader;