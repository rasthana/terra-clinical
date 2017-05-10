import { PropTypes } from 'react';

/**
 * The ComponentDisclosureRegistry will hold a mapping of string to Component values that users of the AppDelegate
 * can use to construct component instances from data in the disclose API.
 *
 * It is not exposed, expect through the AppDelegate, to prevent unneccesary manipulation.
 */

const ComponentDisclosureRegistry = {};

const getComponent = key => (
  ComponentDisclosureRegistry[key]
);

const registerComponent = (key, Component) => {
  ComponentDisclosureRegistry[key] = Component;
};

class AppDelegateInstance {
  constructor(data) {
    // Required API's
    this.disclose = data.disclose;

    // Optional API's
    this.dismiss = data.dismiss;
    this.closeDisclosure = data.closeDisclosure;
    this.goBack = data.goBack;
    this.maximize = data.maximize;
    this.minimize = data.minimize;
  }
}

const create = data => (Object.freeze(new AppDelegateInstance(data)));

const createDescendant = (delegate, data) => {
  const ancestorDelegate = delegate || {};

  return create({
    disclose: data.disclose || ancestorDelegate.disclose,
    dismiss: data.dismiss || ancestorDelegate.dismiss,
    closeDisclosure: data.closeDisclosure || ancestorDelegate.closeDisclosure,
    goBack: data.goBack || ancestorDelegate.goBack,
    maximize: data.maximize || ancestorDelegate.maximize,
    minimize: data.minimize || ancestorDelegate.minimize,
  });
};

// Factory to limit the creation of these App objects.
const AppDelegate = {
  propType: PropTypes.instanceOf(AppDelegateInstance),
  create,
  createDescendant,
  registerComponent,
  getComponent,
};

export default AppDelegate;
