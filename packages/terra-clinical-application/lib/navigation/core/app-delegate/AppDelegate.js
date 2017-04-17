"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppDelegate = function () {
  /**
   * disclose(options) - A function that presents the given content using the specified progressive disclosure method.
   *   options - An Object containing values for the following keys:
   *     content - A React component that will safely handle a 'navigator' prop getting passed to it. Optional,
   *     fallbackUrl - A string URL that can be used to load the desired component. Optional.
   *     preferredType - A string indicating the desired disclose type. One of 'modal', 'panel', 'main'. Optional.
   *     size - A string indicating the desired size of the disclosure. One of 'small', 'large'. Optional.
   *     panelBehavior - A string indicating the desired panel behavior, if used. One of 'overlay', 'squish'. Optional.
   *
   * dismiss(options) - A function that will dismiss the calling component while maintaining the current disclosure state.
   *   options - An Object used to pass arbitrary data.
   *
   * closeDisclosure(options) - A function that will close the disclosure mechanism the calling component is displayed within.
   *                            This will reset the state of that disclosure mechanism completely. This should be used to as a click handler for Close buttons in headers, footers, etc.
   *   options - An Object used to pass arbitrary data.
   *
   * goBack(options) - A function that will dismiss the calling component and return to the previously displayed component in the disclosure stack. In all likelihood, this function
   *                   is the same as the dismiss function; the only difference is that this function will not be provided when the component is the first item of the stack. Thus,
   *                   components can use the presence of this function to determine whether or not they should create a Back button in their component.
   *   options - An Object used to pass arbitrary data.
   *
   */
  function AppDelegate(data) {
    _classCallCheck(this, AppDelegate);

    // Required API's
    this.disclose = data.disclose;
    this.dismiss = data.dismiss;
    this.state = data.state;

    // Optional API's
    this.closeDisclosure = data.closeDisclosure;
    this.goBack = data.goBack;
    this.maximize = data.maximize;
  }

  _createClass(AppDelegate, null, [{
    key: "mergeDelegate",
    value: function mergeDelegate(delegate, data) {
      var baseDelegate = delegate || {};

      return new AppDelegate({
        disclose: data.disclose || baseDelegate.disclose,
        dismiss: data.dismiss || baseDelegate.dismiss,
        maximize: data.maximize || baseDelegate.maximize,
        closeDisclosure: data.closeDisclosure || baseDelegate.closeDisclosure,
        goBack: data.goBack || baseDelegate.goBack,
        state: data.state || baseDelegate.state
      });
    }
  }]);

  return AppDelegate;
}();

exports.default = AppDelegate;