import { PropTypes } from 'react';

class App {
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
  constructor(data) {
    // Required API's
    this.disclose = data.disclose;
    this.dismiss = data.dismiss;

    // Optional API's
    this.closeDisclosure = data.closeDisclosure;
    this.goBack = data.goBack;
    this.maximize = data.maximize;

    // State
    this.disclosedAs = data.disclosedAs;
    this.availableDisclosureTypes = data.availableDisclosureTypes;
    this.isMaximized = data.isMaxized;
  }

  static merge(delegate, data) {
    const baseDelegate = delegate || {};

    return new App({
      disclose: data.disclose || baseDelegate.disclose,
      dismiss: data.dismiss || baseDelegate.dismiss,
      maximize: data.maximize || baseDelegate.maximize,
      closeDisclosure: data.closeDisclosure || baseDelegate.closeDisclosure,
      goBack: data.goBack || baseDelegate.goBack,
    });
  }
}

const AppDelegate = {
  create: (data) => {
    const newAppDelegate = new App(data);
    return Object.freeze(newAppDelegate);
  },
  merge: (baseDelegate, data) => (
    Object.freeze(App.merge(baseDelegate, data))
  ),
  propType: PropTypes.instanceOf(App),
};

export default AppDelegate;
