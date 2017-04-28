import { PropTypes } from 'react';

class App {
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
  constructor(data) {
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

  static merge(delegate, data) {
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
}


// Factory to limit the creation of these App objects.
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
