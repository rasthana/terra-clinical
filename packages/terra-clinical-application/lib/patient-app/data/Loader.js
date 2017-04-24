'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = function () {
  function Loader(data) {
    _classCallCheck(this, Loader);

    this.dataKey = data.dataKey;
    this.onRequest = data.onRequest;
    this.onChange = data.onChange;

    this.isLoading = false;
  }

  _createClass(Loader, [{
    key: 'destroy',
    value: function destroy() {}
  }, {
    key: 'initiateRequest',
    value: function initiateRequest(requestCallback) {
      var _this = this;

      this.isLoading = true;

      requestCallback(function (data) {
        var stateChange = {};
        stateChange[_this.dataKey || 'data'] = data;
        stateChange.isLoading = false;

        _this.onChange(stateChange);
      });

      this.onChange({ isLoading: true });
    }
  }, {
    key: 'get',
    value: function get() {
      this.initiateRequest(this.onRequest);
    }
  }]);

  return Loader;
}();

exports.default = Loader;