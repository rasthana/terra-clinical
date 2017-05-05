import React, { PropTypes } from 'react';

import './NavigationSlide.scss';

const propTypes = {
  isHidden: PropTypes.bool,
  children: PropTypes.node,
};

const NavigationSlide = props => (
  <div className="terraClinical-NavigationSlide" aria-hidden={props.isHidden || null}>
    <div className="terraClinical-NavigationSlide-shadow" />
    {props.children}
  </div>
);

NavigationSlide.propTypes = propTypes;

export default NavigationSlide;
