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

var _Placeholder = require('../../generic-components/placeholder/Placeholder');

var _Placeholder2 = _interopRequireDefault(_Placeholder);

var _PatientList = require('./PatientList');

var _PatientList2 = _interopRequireDefault(_PatientList);

var _PatientLoader = require('../data/PatientLoader');

var _PatientLoader2 = _interopRequireDefault(_PatientLoader);

var _PatientDetailController = require('../patient-detail/PatientDetailController');

var _PatientDetailController2 = _interopRequireDefault(_PatientDetailController);

var _disclosable = require('../hoc/disclosable');

var _disclosable2 = _interopRequireDefault(_disclosable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PatientListController = function (_React$Component) {
  _inherits(PatientListController, _React$Component);

  function PatientListController(props) {
    _classCallCheck(this, PatientListController);

    var _this = _possibleConstructorReturn(this, (PatientListController.__proto__ || Object.getPrototypeOf(PatientListController)).call(this, props));

    _this.refresh = _this.refresh.bind(_this);
    _this.presentPatientDetail = _this.presentPatientDetail.bind(_this);
    _this.presentNestedPatientList = _this.presentNestedPatientList.bind(_this);

    _this.state = {
      isLoading: false,
      patientListData: props.patientListData
    };

    _this.loader = new _PatientLoader2.default({
      dataKey: 'patientListData',
      onStoreUpdate: function onStoreUpdate() {
        _this.refresh();
      },
      onChange: function onChange(loaderState) {
        _this.setState(loaderState);
      }
    });
    return _this;
  }

  _createClass(PatientListController, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.state.patientListData) {
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
      this.loader.getPatientList(this.props.physicianId);
    }
  }, {
    key: 'presentPatientDetail',
    value: function presentPatientDetail(patient, type) {
      this.props.app.disclose({
        preferredType: type,
        panelBehavior: 'squish',
        content: {
          key: 'DETAIL_' + this.props.physicianId + '_' + patient.id,
          name: _PatientDetailController2.default.disclosureKey,
          props: {
            physicianId: this.props.physicianId,
            patientId: patient.id
          }
        }
      });
    }
  }, {
    key: 'presentNestedPatientList',
    value: function presentNestedPatientList(type) {
      this.props.app.disclose({
        preferredType: type,
        size: 'large',
        panelBehavior: 'overlay',
        content: {
          key: 'LIST_EMBEDDED_' + Math.random(),
          fallbackUrl: window.location.origin + '/?type=' + type + Math.random()
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          app = _props.app,
          physicianId = _props.physicianId,
          patientListData = _props.patientListData,
          customProps = _objectWithoutProperties(_props, ['app', 'physicianId', 'patientListData']);

      if (!this.state.patientListData) {
        return _react2.default.createElement(_Placeholder2.default, { app: app, headerText: 'Patient List', loadingText: 'Loading patients...' });
      }

      return _react2.default.createElement(_PatientList2.default, _extends({}, customProps, {
        app: app,
        patients: { patients: this.state.patientListData },
        isLoading: this.state.isLoading,
        onRefresh: this.refresh,
        onSelectPatientDetail: this.presentPatientDetail,
        onShowPatientList: this.presentNestedPatientList
      }));
    }
  }]);

  return PatientListController;
}(_react2.default.Component);

PatientListController.propTypes = {
  app: _AppDelegate2.default.propType,
  physicianId: _react.PropTypes.string,
  patientListData: _react.PropTypes.object
};

exports.default = (0, _disclosable2.default)()(PatientListController);