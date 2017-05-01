import React from 'react';

import ComponentRegistry from '../../navigation/core/registry/ComponentRegistry';

const disclosable = customKey => (
  (WrappedComponent) => {
    const Disclosable = props => (
      <WrappedComponent {...props} />
    );

    Disclosable.displayName = (() => (
      `Disclosable(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    ))();

    Disclosable.disclosureKey = (() => (
      `${WrappedComponent.displayName || WrappedComponent.name || 'Component'}[${customKey || ''}]`
    ))();

    ComponentRegistry[Disclosable.disclosureKey] = Disclosable;

    return Disclosable;
  }
);

export default disclosable;
