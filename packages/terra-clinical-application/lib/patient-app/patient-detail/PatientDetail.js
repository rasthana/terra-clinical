'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _terraButton = require('terra-button');

var _terraButton2 = _interopRequireDefault(_terraButton);

var _terraButtonGroup = require('terra-button-group');

var _terraButtonGroup2 = _interopRequireDefault(_terraButtonGroup);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PatientDetail = function (_React$Component) {
  _inherits(PatientDetail, _React$Component);

  function PatientDetail(props) {
    _classCallCheck(this, PatientDetail);

    var _this = _possibleConstructorReturn(this, (PatientDetail.__proto__ || Object.getPrototypeOf(PatientDetail)).call(this, props));

    _this.showPatientUpdate = _this.showPatientUpdate.bind(_this);
    return _this;
  }

  _createClass(PatientDetail, [{
    key: 'showPatientUpdate',
    value: function showPatientUpdate(patient, type) {
      var _this2 = this;

      return function () {
        if (_this2.props.onSelectPatientUpdate) {
          _this2.props.onSelectPatientUpdate(patient, type);
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var patient = this.props.patient;

      var loadingIndicator = void 0;
      if (this.props.isLoading) {
        loadingIndicator = _react2.default.createElement(_ActivityIndicator2.default, null);
      }

      var detailContent = void 0;
      if (patient) {
        detailContent = _react2.default.createElement(_terraClinicalDetailView2.default, {
          title: patient.name,
          subtitles: [patient.status],
          graph: _react2.default.createElement('img', { style: { width: '280px' }, alt: 'patient-img', src: patient.photo }),
          details: [_react2.default.createElement(
            'div',
            { key: 'UPDATE_BUTTONS' },
            _react2.default.createElement(
              _terraButtonGroup2.default,
              { size: 'small' },
              _react2.default.createElement(_terraButtonGroup2.default.Button, {
                key: 'PANEL',
                text: 'Update (Panel)',
                onClick: this.showPatientUpdate(patient, 'panel')
              }),
              _react2.default.createElement(_terraButtonGroup2.default.Button, {
                key: 'MODAL',
                text: 'Update (Modal)',
                onClick: this.showPatientUpdate(patient, 'modal')
              }),
              _react2.default.createElement(_terraButtonGroup2.default.Button, {
                key: 'MAIN',
                text: 'Update (Main)',
                onClick: this.showPatientUpdate(patient, 'main')
              })
            )
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
            this.props.onRefresh && _react2.default.createElement(_terraButton2.default, { onClick: this.props.onRefresh, icon: _react2.default.createElement(_IconRefresh2.default, { isSpin: this.props.isLoading }) })
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
  app: _AppDelegate2.default.propType,
  patient: _react.PropTypes.object,
  isLoading: _react.PropTypes.bool,
  onRefresh: _react.PropTypes.func,
  onSelectPatientUpdate: _react.PropTypes.func
};

exports.default = PatientDetail;