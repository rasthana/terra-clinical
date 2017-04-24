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

var _Placeholder = require('../../generic-components/placeholder/Placeholder');

var _Placeholder2 = _interopRequireDefault(_Placeholder);

var _PatientDetail = require('./PatientDetail');

var _PatientDetail2 = _interopRequireDefault(_PatientDetail);

var _PatientLoader = require('../data/PatientLoader');

var _PatientLoader2 = _interopRequireDefault(_PatientLoader);

var _PatientUpdateController = require('../patient-update/PatientUpdateController');

var _PatientUpdateController2 = _interopRequireDefault(_PatientUpdateController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PatientDetailController = function (_React$Component) {
  _inherits(PatientDetailController, _React$Component);

  function PatientDetailController(props) {
    _classCallCheck(this, PatientDetailController);

    var _this = _possibleConstructorReturn(this, (PatientDetailController.__proto__ || Object.getPrototypeOf(PatientDetailController)).call(this, props));

    _this.refresh = _this.refresh.bind(_this);
    _this.presentPatientUpdate = _this.presentPatientUpdate.bind(_this);

    _this.state = {
      isLoading: false,
      patient: props.patient
    };

    _this.loader = new _PatientLoader2.default({
      dataKey: 'patient',
      onStoreUpdate: function onStoreUpdate() {
        _this.refresh();
      },
      onChange: function onChange(loaderState) {
        _this.setState(loaderState);
      }
    });
    return _this;
  }

  _createClass(PatientDetailController, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.state.patient) {
        this.refresh();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.loader.destroy();
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.loader.getPatient(this.props.physicianId, this.props.patientId);
    }
  }, {
    key: 'presentPatientUpdate',
    value: function presentPatientUpdate(patient, type) {
      debugger;

      this.props.app.disclose({
        content: _react2.default.createElement(_PatientUpdateController2.default, {
          key: 'update_' + patient.id,
          physicianId: this.props.physicianId,
          patientId: this.props.patientId
        }),
        preferredType: type
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          app = _props.app,
          patient = _props.patient,
          physicianId = _props.physicianId,
          patientId = _props.patientId,
          customProps = _objectWithoutProperties(_props, ['app', 'patient', 'physicianId', 'patientId']);

      if (!this.state.patient) {
        return _react2.default.createElement(_Placeholder2.default, { app: app, headerText: 'Patient Detail', loadingText: 'Loading patient...' });
      } else {
        return _react2.default.createElement(_PatientDetail2.default, _extends({}, customProps, {
          app: app,
          patient: this.state.patient,
          isLoading: this.state.isLoading,
          onRefresh: this.refresh,
          onSelectPatientUpdate: this.presentPatientUpdate
        }));
      }
    }
  }]);

  return PatientDetailController;
}(_react2.default.Component);

PatientDetailController.propTypes = {
  app: _AppDelegate2.default.propType,
  physicianId: _react.PropTypes.string,
  patientId: _react.PropTypes.string,
  patient: _react.PropTypes.object
};

exports.default = PatientDetailController;