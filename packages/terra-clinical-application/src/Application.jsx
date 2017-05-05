import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Base from 'terra-base';
import AppDelegate from 'terra-clinical-app-delegate';

const propTypes = {
  app: AppDelegate.propType,
  children: PropTypes.node,
};

const Application = ({ app, children, ...customProps }) => (
  <Base {...customProps} className={classNames([customProps.className, 'terraClinical-Application'])}>
    {React.Children.map(children, child => (
      React.cloneElement(child, { app })
    ))}
  </Base>
);

Application.propTypes = propTypes;

export default Application;
