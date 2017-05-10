import { PropTypes } from 'react';

/**
 * The ComponentDisclosureRegistry will hold a mapping of string to Component values that users of the AppDelegate
 * can use to construct component instances from data in the disclose API.
 *
 * It is not exposed, expect through the AppDelegate, to prevent unneccesary manipulation.
 */

const ComponentDisclosureRegistry = {};

const registerComponentForDisclosure = (key, Component) => {
  ComponentDisclosureRegistry[key] = Component;
};

const getComponentForDisclosure = key => (
  ComponentDisclosureRegistry[key]
);

class AppDelegateInstance {
  constructor(data) {
    this.disclose = data.disclose;
    this.dismiss = data.dismiss;
    this.closeDisclosure = data.closeDisclosure;
    this.goBack = data.goBack;
    this.maximize = data.maximize;
    this.minimize = data.minimize;
  }
}

const create = data => (
  Object.freeze(new AppDelegateInstance(data))
);

const clone = (delegate, data) => {
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

const AppDelegate = {
  propType: PropTypes.instanceOf(AppDelegateInstance),
  create,
  clone,
  registerComponentForDisclosure,
  getComponentForDisclosure,
};

export default AppDelegate;
