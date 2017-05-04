import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './ClinicalAppDelegate.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

const defaultProps = {
  name: 'default',
  variant: 'terra-ClinicalAppDelegate--default',
};

const ClinicalAppDelegate = (props) => (
  <div />
);

ClinicalAppDelegate.propTypes = propTypes;
ClinicalAppDelegate.defaultProps = defaultProps;

export default ClinicalAppDelegate;
