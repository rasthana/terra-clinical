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

var _PatientDetail = require('../patient-detail/PatientDetail');

var _PatientDetail2 = _interopRequireDefault(_PatientDetail);

var _PatientStore = require('./data/PatientStore');

var _PatientStore2 = _interopRequireDefault(_PatientStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var patientListId = 0;

var PatientList = function (_React$Component) {
  _inherits(PatientList, _React$Component);

  function PatientList(props) {
    _classCallCheck(this, PatientList);

    var _this = _possibleConstructorReturn(this, (PatientList.__proto__ || Object.getPrototypeOf(PatientList)).call(this, props));

    _this.state = {
      id: patientListId += 1,
      isLoading: true,
      patientList: undefined
    };

    _this.refresh = _this.refresh.bind(_this);
    _this.showPatientDetail = _this.showPatientDetail.bind(_this);
    _this.showIn = _this.showIn.bind(_this);
    return _this;
  }

  _createClass(PatientList, [{
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
        newDataState.patientList = _PatientStore2.default.getPatientList(_this3.props.physicianId);

        _this3.setState(newDataState);
      }, 0);
    }
  }, {
    key: 'showPatientDetail',
    value: function showPatientDetail(patient, type) {
      var _this4 = this;

      return function () {
        var patientDetailComponent = _react2.default.createElement(_PatientDetail2.default, {
          key: 'PATIENT_DETAIL:' + patient.id,
          physicianId: _this4.props.physicianId,
          patientId: patient.id
        });

        _this4.props.app.disclose({ content: patientDetailComponent, preferredType: type });
      };
    }
  }, {
    key: 'showIn',
    value: function showIn(type) {
      var _this5 = this;

      return function () {
        // const modalPatientList = (
        //   <PatientList
        //     key={`PATIENT_LIST:${this.state.id + 1}`}
        //     physicianId={this.props.physicianId}
        //   />
        // );

        _this5.props.app.disclose({
          // content: modalPatientList,
          fallbackUrl: window.location.origin + '/?type=' + type,
          preferredType: type,
          size: 'large',
          panelBehavior: 'overlay' });
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var loadingIndicator = void 0;
      if (this.state.isLoading) {
        loadingIndicator = _react2.default.createElement(_ActivityIndicator2.default, null);
      }

      var patientListItems = [];
      if (this.state.patientList && this.state.patientList.length) {
        this.state.patientList.forEach(function (patient) {
          patientListItems.push(_react2.default.createElement(_terraList2.default.Item, {
            key: patient.id,
            content: _react2.default.createElement(_terraClinicalItemView2.default, {
              className: 'orion-ClinicalItemView',
              displays: [_react2.default.createElement(_terraClinicalItemView2.default.Display, { text: patient.name }), _react2.default.createElement(_terraClinicalItemView2.default.Display, { text: patient.status })],
              comment: _react2.default.createElement(_terraClinicalItemView2.default.Comment, { text: patient.comment }),
              endAccessory: _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_terraButton2.default, { onClick: _this6.showPatientDetail(patient, 'modal'), text: 'View (Modal)' }),
                _react2.default.createElement(_terraButton2.default, { onClick: _this6.showPatientDetail(patient, 'panel'), text: 'View (Panel)' }),
                _react2.default.createElement(_terraButton2.default, { onClick: _this6.showPatientDetail(patient, 'main'), text: 'View (Main)' })
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
            _react2.default.createElement(_terraButton2.default, { key: 'Refresh', onClick: this.refresh, icon: _react2.default.createElement(_IconRefresh2.default, { isSpin: this.state.isLoading }) }),
            _react2.default.createElement(_terraButton2.default, { key: 'Modal', onClick: this.showIn('modal'), text: 'Launch Modal' }),
            _react2.default.createElement(_terraButton2.default, { key: 'Panel', onClick: this.showIn('panel'), text: 'Launch Panel' }),
            _react2.default.createElement(_terraButton2.default, { key: 'Main', onClick: this.showIn('main'), text: 'Launch Main' })
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
  physicianId: _react.PropTypes.string,
  app: _react.PropTypes.instanceOf(_AppDelegate2.default)
};

exports.default = PatientList;