import React, { PropTypes } from 'react';

import './NavStackContainer.scss';

const propTypes = {
  isHidden: PropTypes.bool,
  children: PropTypes.node,
};

const NavStackContainer = props => (
  <div className="orion-NavStackContainer" aria-hidden={props.isHidden || null}>
    <div className="orion-NavStackContainer-shadow" />
    {props.children}
  </div>
);

NavStackContainer.propTypes = propTypes;

export default NavStackContainer;
