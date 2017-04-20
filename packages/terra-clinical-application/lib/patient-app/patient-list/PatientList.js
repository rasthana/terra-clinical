'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _terraButton = require('terra-button');

var _terraButton2 = _interopRequireDefault(_terraButton);

var _terraList = require('terra-list');

var _terraList2 = _interopRequireDefault(_terraList);

var _terraClinicalItemView = require('terra-clinical-item-view');

var _terraClinicalItemView2 = _interopRequireDefault(_terraClinicalItemView);

var _IconRefresh = require('terra-icon/lib/icon/IconRefresh');

var _IconRefresh2 = _interopRequireDefault(_IconRefresh);

var _AppDelegate = require('../../navigation/core/app-delegate/AppDelegate');

var _AppDelegate2 = _interopRequireDefault(_AppDelegate);

var _NavigationHeader = require('../../navigation/core/navigation-header/NavigationHeader');

var _NavigationHeader2 = _interopRequireDefault(_NavigationHeader);

var _ActivityIndicator = require('../../generic-components/activity-indicator/ActivityIndicator');

var _ActivityIndicator2 = _interopRequireDefault(_ActivityIndicator);

var _ContentContainer = require('../../generic-components/content-container/ContentContainer');

var _ContentContainer2 = _interopRequireDefault(_ContentContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import PatientDetail from '../patient-detail/PatientDetail';
// import PatientStore from './data/PatientStore';

// import refreshable from '../../hoc/refreshable/refreshable';

var patientListId = 0;

var PatientList = function (_React$Component) {
  _inherits(PatientList, _React$Component);

  function PatientList(props) {
    _classCallCheck(this, PatientList);

    var _this = _possibleConstructorReturn(this, (PatientList.__proto__ || Object.getPrototypeOf(PatientList)).call(this, props));

    _this.showPatientDetail = _this.showPatientDetail.bind(_this);
    _this.showPatientList = _this.showPatientList.bind(_this);

    _this.state = {
      id: patientListId += 1
    };
    return _this;
  }

  _createClass(PatientList, [{
    key: 'showPatientDetail',
    value: function showPatientDetail(patient, type) {
      var _this2 = this;

      return function () {
        _this2.props.onSelectPatientDetail(patient, type);
      };
    }
  }, {
    key: 'showPatientList',
    value: function showPatientList(patient, type) {
      var _this3 = this;

      // debugger;
      return function () {
        _this3.props.onShowPatientList(type);
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var loadingIndicator = void 0;
      if (this.props.isLoading) {
        loadingIndicator = _react2.default.createElement(_ActivityIndicator2.default, null);
      }

      var patientList = this.props.data;

      var patientListItems = [];
      if (patientList && patientList.patients && patientList.patients.length) {
        patientList.patients.forEach(function (patient) {
          patientListItems.push(_react2.default.createElement(_terraList2.default.Item, {
            key: patient.id,
            content: _react2.default.createElement(_terraClinicalItemView2.default, {
              className: 'orion-ClinicalItemView',
              displays: [_react2.default.createElement(_terraClinicalItemView2.default.Display, { text: patient.name }), _react2.default.createElement(_terraClinicalItemView2.default.Display, { text: patient.status })],
              comment: _react2.default.createElement(_terraClinicalItemView2.default.Comment, { text: patient.comment }),
              endAccessory: _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_terraButton2.default, { onClick: _this4.showPatientDetail(patient, 'modal'), text: 'View (Modal)' }),
                _react2.default.createElement(_terraButton2.default, { onClick: _this4.showPatientDetail(patient, 'panel'), text: 'View (Panel)' }),
                _react2.default.createElement(_terraButton2.default, { onClick: _this4.showPatientDetail(patient, 'main'), text: 'View (Main)' })
              )
            })
          }));
        });
      }

      return _react2.default.createElement(
        _ContentContainer2.default,
        {
          className: 'orion-PatientList',
          header: _react2.default.createElement(
            _NavigationHeader2.default,
            { title: 'Patient List - ' + this.state.id, app: this.props.app },
            this.props.onRefresh && _react2.default.createElement(_terraButton2.default, { key: 'Refresh', onClick: this.props.onRefresh, icon: _react2.default.createElement(_IconRefresh2.default, { isSpin: this.props.isLoading }) }),
            _react2.default.createElement(_terraButton2.default, { key: 'Modal', onClick: this.showPatientList('modal'), text: 'Launch Modal' }),
            _react2.default.createElement(_terraButton2.default, { key: 'Panel', onClick: this.showPatientList('panel'), text: 'Launch Panel' }),
            _react2.default.createElement(_terraButton2.default, { key: 'Main', onClick: this.showPatientList('main'), text: 'Launch Main' })
          ),
          fill: true
        },
        loadingIndicator,
        _react2.default.createElement(
          _terraList2.default,
          { isDivided: true },
          patientListItems
        )
      );
    }
  }]);

  return PatientList;
}(_react2.default.Component);

PatientList.propTypes = {
  // physicianId: PropTypes.string,
  app: _AppDelegate2.default.propType,
  data: _react.PropTypes.object,
  isLoading: _react.PropTypes.bool,
  onRefresh: _react.PropTypes.func,
  onSelectPatientDetail: _react.PropTypes.func,
  onShowPatientList: _react.PropTypes.func
};

exports.default = PatientList;