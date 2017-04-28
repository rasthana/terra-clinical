'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  /**
   * disclose(options) - A function that presents the given content using the specified progressive disclosure method.
   *   options - An Object containing disclosure data.
   *
   * dismiss(options) - A function that will dismiss the calling component while maintaining the current disclosure state.
   *   options - An Object used to pass arbitrary data.
   *
   * closeDisclosure(options) - A function that will close the disclosure mechanism the calling component is displayed within.
   *                            This will reset the state of that disclosure mechanism completely. This should be used to as a click handler for Close buttons in headers, footers, etc.
   *   options - An Object used to pass arbitrary data.
   *
   * maximize(options) - A function that can be used to 'maximize' the current disclosure type. Could be alternatively called 'fullscreen' or something'.
   *   options - An Object used to pass arbitrary data.
   *
   * canGoBack - A boolean indicating whether or not a component has the ability to go back to another component in the same disclosure type. Basically,
   *             it's a "Should I display a Back button" flag.
   *
   * disclosedAs - A string indicating the current disclosure type in which the component is displayed as. Can be undefined. Can be used by components
   *               to tweak workflows if desired, but the applications should work regardless.
   *
   * availableDisclosureTypes - An array of disclosure types available to the Component. Can be used to tweak disclosure workflows if desired.
   *
   * isMaximized - A boolean indicating whether or not the current disclosure is "maximized". Can be used to render different content, or simply
   *               change an icon from maximize to minimize and vice versa.
   */
  function App(data) {
    _classCallCheck(this, App);

    // Required API's
    this.disclose = data.disclose;
    this.dismiss = data.dismiss;

    // Optional API's
    this.closeDisclosure = data.closeDisclosure;
    this.maximize = data.maximize;

    // Application State
    this.canGoBack = data.canGoBack;
    this.disclosedAs = data.disclosedAs;
    this.availableDisclosureTypes = data.availableDisclosureTypes;
    this.isMaximized = data.isMaximized;
  }

  _createClass(App, null, [{
    key: 'merge',
    value: function merge(delegate, data) {
      // Required API's
      this.disclose = data.disclose || delegate.disclose;
      this.dismiss = data.dismiss || delegate.dismiss;

      // Optional API's
      this.closeDisclosure = data.closeDisclosure || delegate.closeDelegate;
      this.maximize = data.maximize || delegate.maximize;

      // Application State
      this.canGoBack = data.canGoBack || delegate.canGoBack;
      this.disclosedAs = data.disclosedAs || delegate.disclosedAs;
      this.availableDisclosureTypes = data.availableDisclosureTypes || delegate.availableDisclosureTypes;
      this.isMaximized = data.isMaximized || delegate.isMaximized;
    }
  }]);

  return App;
}();

// Factory to limit the creation of these App objects.


var AppDelegate = {
  create: function create(data) {
    var newAppDelegate = new App(data);
    return Object.freeze(newAppDelegate);
  },
  merge: function merge(baseDelegate, data) {
    return Object.freeze(App.merge(baseDelegate, data));
  },
  propType: _react.PropTypes.instanceOf(App)
};

exports.default = AppDelegate;