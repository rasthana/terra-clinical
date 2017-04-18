'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _terraButton = require('terra-button');

var _terraButton2 = _interopRequireDefault(_terraButton);

var _terraClinicalDetailView = require('terra-clinical-detail-view');

var _terraClinicalDetailView2 = _interopRequireDefault(_terraClinicalDetailView);

var _IconRefresh = require('terra-icon/lib/icon/IconRefresh');

var _IconRefresh2 = _interopRequireDefault(_IconRefresh);

var _AppDelegate = require('../../navigation/core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

var _NavigationHeader = require('../../navigation/core/navigation-header/NavigationHeader');

var _NavigationHeader2 = _interopRequireDefault(_NavigationHeader);

var _ContentContainer = require('../../generic-components/content-container/ContentContainer');

var _ContentContainer2 = _interopRequireDefault(_ContentContainer);

var _ActivityIndicator = require('../../generic-components/activity-indicator/ActivityIndicator');

var _ActivityIndicator2 = _interopRequireDefault(_ActivityIndicator);

var _PatientUpdate = require('../patient-update/PatientUpdate');

var _PatientUpdate2 = _interopRequireDefault(_PatientUpdate);

var _PatientStore = require('../patient-list/data/PatientStore');

var _PatientStore2 = _interopRequireDefault(_PatientStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PatientDetail = function (_React$Component) {
  _inherits(PatientDetail, _React$Component);

  function PatientDetail(props) {
    _classCallCheck(this, PatientDetail);

    var _this = _possibleConstructorReturn(this, (PatientDetail.__proto__ || Object.getPrototypeOf(PatientDetail)).call(this, props));

    _this.state = {
      isLoading: true,
      patient: undefined
    };

    _this.refresh = _this.refresh.bind(_this);
    return _this;
  }

  _createClass(PatientDetail, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.refresh();

      this.unsubscribeFromStore = _PatientStore2.default.subscribe(function () {
        return _this2.refresh();
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribeFromStore();
      clearTimeout(this.refreshTimeout);
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var _this3 = this;

      var newState = _extends({}, this.state);

      newState.isLoading = true;

      this.setState(newState);

      this.refreshTimeout = setTimeout(function () {
        var newDataState = _extends({}, _this3.state);

        newDataState.isLoading = false;
        newDataState.patient = _PatientStore2.default.getPatient(_this3.props.physicianId, _this3.props.patientId);

        _this3.setState(newDataState);
      }, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var patient = this.state.patient;

      var loadingIndicator = void 0;
      if (this.state.isLoading) {
        loadingIndicator = _react2.default.createElement(_ActivityIndicator2.default, null);
      }

      var detailContent = void 0;
      if (patient) {
        detailContent = _react2.default.createElement(_terraClinicalDetailView2.default, {
          title: patient.name,
          subtitles: [patient.status],
          graph: _react2.default.createElement('img', { style: { width: '200px' }, alt: 'patient-img', src: patient.photo }),
          details: [_react2.default.createElement(
            'div',
            { key: 'UPDATE_BUTTONS' },
            _react2.default.createElement(_terraButton2.default, {
              text: 'Update (Panel)',
              onClick: function onClick() {
                return _this4.props.app.disclose({
                  content: _react2.default.createElement(_PatientUpdate2.default, {
                    key: 'PATIENT_UPDATE:' + _this4.props.physicianId + ':' + _this4.props.patientId,
                    physicianId: _this4.props.physicianId,
                    patientId: _this4.props.patientId
                  }),
                  preferredType: 'panel' });
              }
            }),
            _react2.default.createElement(_terraButton2.default, {
              text: 'Update (Modal)',
              onClick: function onClick() {
                return _this4.props.app.disclose({
                  content: _react2.default.createElement(_PatientUpdate2.default, {
                    key: 'PATIENT_UPDATE:' + _this4.props.physicianId + ':' + _this4.props.patientId,
                    physicianId: _this4.props.physicianId,
                    patientId: _this4.props.patientId
                  }),
                  preferredType: 'modal' });
              }
            }),
            _react2.default.createElement(_terraButton2.default, {
              text: 'Update (Main)',
              onClick: function onClick() {
                return _this4.props.app.disclose({
                  content: _react2.default.createElement(_PatientUpdate2.default, {
                    key: 'PATIENT_UPDATE:' + _this4.props.physicianId + ':' + _this4.props.patientId,
                    physicianId: _this4.props.physicianId,
                    patientId: _this4.props.patientId
                  }),
                  preferredType: 'main' });
              }
            })
          )],
          footer: patient.comment,
          isDivided: true
        });
      }

      return _react2.default.createElement(
        _ContentContainer2.default,
        {
          id: 'orion-PatientDetail',
          header: _react2.default.createElement(
            _NavigationHeader2.default,
            { title: 'Patient Detail', app: this.props.app },
            _react2.default.createElement(_terraButton2.default, { onClick: this.refresh, icon: _react2.default.createElement(_IconRefresh2.default, { isSpin: this.state.isLoading }) })
          ),
          fill: true
        },
        loadingIndicator,
        detailContent
      );
    }
  }]);

  return PatientDetail;
}(_react2.default.Component);

PatientDetail.propTypes = {
  app: _react.PropTypes.instanceOf(_AppDelegate2.default),
  physicianId: _react.PropTypes.string,
  patientId: _react.PropTypes.string
};

exports.default = PatientDetail;