import React, { PropTypes } from 'react';
import Base from 'terra-base';

import AppDelegate from '../../core/app-delegate/AppDelegate';

import './ClinicalBase.scss';

const ClinicalBase = ({ app, children, ...customProps }) => (
  <Base {...customProps}>
    {React.Children.map(children, child => React.cloneElement(child, { app }))}
  </Base>
);

ClinicalBase.propTypes = {
  children: PropTypes.node,
  app: PropTypes.instanceOf(AppDelegate),
};

export default ClinicalBase;
