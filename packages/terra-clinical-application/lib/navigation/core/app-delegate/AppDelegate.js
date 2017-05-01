'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App =
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

  // Optional API's
  this.dismiss = data.dismiss;
  this.closeDisclosure = data.closeDisclosure;
  this.maximize = data.maximize;

  // Application State
  this.canGoBack = data.canGoBack;
  this.disclosedAs = data.disclosedAs;
  this.availableDisclosureTypes = data.availableDisclosureTypes;
  this.isMaximized = data.isMaximized;
};

// Factory to limit the creation of these App objects.


var AppDelegate = {
  create: function create(data) {
    var newAppDelegate = new App(data);
    return Object.freeze(newAppDelegate);
  },
  propType: _react.PropTypes.instanceOf(App)
};

exports.default = AppDelegate;