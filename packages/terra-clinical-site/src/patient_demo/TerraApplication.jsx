import React, { PropTypes } from 'react';
import Base from 'terra-base';
import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';

const propTypes = {
  app: AppDelegate.propType,
  children: PropTypes.node,
}

const TerraApplication = ({ app, children, ...customProps }) => (
  <Base {...customProps}>
    {React.Children.map(children, child => (
      React.cloneElement(child, { app })
    ))}
  </Base>
)

TerraApplication.propTypes = propTypes;

export default TerraApplication;
