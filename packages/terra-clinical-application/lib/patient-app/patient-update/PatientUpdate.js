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

var _ActivityIndicator = require('../../generic-components/activity-indicator/ActivityIndicator');

var _ActivityIndicator2 = _interopRequireDefault(_ActivityIndicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PatientUpdate = function (_React$Component) {
  _inherits(PatientUpdate, _React$Component);

  function PatientUpdate(props) {
    _classCallCheck(this, PatientUpdate);

    var _this = _possibleConstructorReturn(this, (PatientUpdate.__proto__ || Object.getPrototypeOf(PatientUpdate)).call(this, props));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    return _this;
  }

  _createClass(PatientUpdate, [{
    key: 'handleSubmit',
    value: function handleSubmit() {
      var changeData = {
        name: this.nameTextAreaElement.value,
        status: this.statusTextAreaElement.value,
        comment: this.commentTextAreaElement.value
      };

      if (this.props.onSubmit) {
        this.props.onSubmit(this.props.app, this.props.patient, changeData);
      }
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      if (this.props.onCancel) {
        this.props.onCancel(this.props.app, this.props.patient);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var patient = this.props.patient;

      var loadingIndicator = void 0;
      if (this.props.isLoading) {
        loadingIndicator = _react2.default.createElement(_ActivityIndicator2.default, null);
      }

      debugger;

      return _react2.default.createElement(
        _ContentContainer2.default,
        {
          id: 'orion-PatientUpdate',
          header: _react2.default.createElement(_NavigationHeader2.default, { title: 'Patient Update', app: this.props.app }),
          fill: true
        },
        loadingIndicator,
        _react2.default.createElement(
          'div',
          { style: { margin: '10px' } },
          _react2.default.createElement(
            'h4',
            null,
            'Update'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Name'
          ),
          _react2.default.createElement('textarea', { ref: function ref(element) {
              _this2.nameTextAreaElement = element;
            }, defaultValue: patient.name }),
          _react2.default.createElement(
            'p',
            null,
            'Status'
          ),
          _react2.default.createElement('textarea', { ref: function ref(element) {
              _this2.statusTextAreaElement = element;
            }, defaultValue: patient.status }),
          _react2.default.createElement(
            'p',
            null,
            'Comment'
          ),
          _react2.default.createElement('textarea', { ref: function ref(element) {
              _this2.commentTextAreaElement = element;
            }, defaultValue: patient.comment }),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_terraButton2.default, { onClick: this.handleCancel, variant: 'secondary', text: 'Cancel' }),
            _react2.default.createElement(_terraButton2.default, { onClick: this.handleSubmit, variant: 'primary', text: 'Submit' })
          )
        )
      );
    }
  }]);

  return PatientUpdate;
}(_react2.default.Component);

PatientUpdate.propTypes = {
  app: _AppDelegate2.default.propType,
  patient: _react.PropTypes.object,
  isLoading: _react.PropTypes.bool,
  onSubmit: _react.PropTypes.func,
  onCancel: _react.PropTypes.func
};

exports.default = PatientUpdate;