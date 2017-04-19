import React from 'react';
import { Provider } from 'xfc';

import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';

const bootstrappedAppDelegate = data => (
  AppDelegate.create({
    disclose: (options) => {
      Provider.trigger('providerApplication.disclose', { options });
    },
    dismiss: (options) => {
      Provider.trigger('providerApplication.dismiss', { options });
    },
    closeDisclosure: data.navigator.closeDisclosure ? (options) => {
      Provider.trigger('providerApplication.closeDisclosure', { options });
    } : null,
    goBack: data.navigator.goBack ? (options) => {
      Provider.trigger('providerApplication.goBack', { options });
    } : null,
    maximize: data.navigator.maximize ? (options) => {
      Provider.trigger('providerApplication.maximize', { options });
    } : null,
  })
);

const embeddedNavHandshake = (component, bootstrapCallback) => {
  Provider.on('consumerApplication.bootstrap', (data) => {
    const embeddedAppDelegate = bootstrappedAppDelegate(data);

    bootstrapCallback(React.cloneElement(component, { app: embeddedAppDelegate }));
  });

  Provider.trigger('providerApplication.mounted', { navigationSupported: true });
};

export { embeddedNavHandshake, bootstrappedAppDelegate };
