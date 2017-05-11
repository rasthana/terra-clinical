import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Base from 'terra-base';
import AppDelegate from 'terra-clinical-app-delegate';

import './Application.scss';

const propTypes = {
  app: AppDelegate.propType,
  children: PropTypes.node.isRequired,
};

const Application = ({ app, children, ...customProps }) => {
  let childrenToRender = children;

  if (app) {
    childrenToRender = React.Children.map(children, child => (
      React.cloneElement(child, { app })
    ));
  }

  return (
    <Base {...customProps} className={classNames([customProps.className, 'terraClinical-Application'])}>
      {childrenToRender}
    </Base>
  );
};

Application.propTypes = propTypes;

export default Application;
