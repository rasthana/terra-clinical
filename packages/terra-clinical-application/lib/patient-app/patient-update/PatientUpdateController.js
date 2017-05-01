'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppDelegate = require('../../navigation/core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

var _Placeholder = require('../../generic-components/placeholder/Placeholder');

var _Placeholder2 = _interopRequireDefault(_Placeholder);

var _PatientLoader = require('../data/PatientLoader');

var _PatientLoader2 = _interopRequireDefault(_PatientLoader);

var _PatientStore = require('../data/PatientStore');

var _PatientStore2 = _interopRequireDefault(_PatientStore);

var _PatientUpdate = require('./PatientUpdate');

var _PatientUpdate2 = _interopRequireDefault(_PatientUpdate);

var _disclosable = require('../hoc/disclosable');

var _disclosable2 = _interopRequireDefault(_disclosable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PatientUpdateController = function (_React$Component) {
  _inherits(PatientUpdateController, _React$Component);

  function PatientUpdateController(props) {
    _classCallCheck(this, PatientUpdateController);

    var _this = _possibleConstructorReturn(this, (PatientUpdateController.__proto__ || Object.getPrototypeOf(PatientUpdateController)).call(this, props));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.refresh = _this.refresh.bind(_this);

    _this.state = {
      isLoading: false,
      patient: props.patientUpdateData
    };

    _this.loader = new _PatientLoader2.default({
      dataKey: 'patient',
      onStoreUpdate: function onStoreUpdate() {
        _this.refresh();
      },
      onChange: function onChange(newState) {
        _this.setState(newState);
      }
    });
    return _this;
  }

  _createClass(PatientUpdateController, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.state.patientUpdateData) {
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
    key: 'handleSubmit',
    value: function handleSubmit(patient, changeData) {
      _PatientStore2.default.update(this.props.physicianId, patient.id, changeData);

      this.props.app.dismiss();
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      this.props.app.dismiss();
    }
  }, {
    key: 'render',
    value: function render() {
      var patient = this.state.patient;

      if (!patient) {
        return _react2.default.createElement(_Placeholder2.default, { app: this.props.app, headerText: 'Patient Update', loadingText: 'Loading patient...' });
      }

      return _react2.default.createElement(_PatientUpdate2.default, {
        app: this.props.app,
        patient: patient,
        isLoading: this.state.isLoading,
        onSubmit: this.handleSubmit,
        onCancel: this.handleCancel
      });
    }
  }]);

  return PatientUpdateController;
}(_react2.default.Component);

PatientUpdateController.propTypes = {
  app: _AppDelegate2.default.propType,
  physicianId: _react.PropTypes.string,
  patientId: _react.PropTypes.string,
  patientUpdateData: _react.PropTypes.object
};

exports.default = (0, _disclosable2.default)()(PatientUpdateController);