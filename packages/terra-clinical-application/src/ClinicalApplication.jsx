import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './ClinicalApplication.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

const defaultProps = {
  name: 'default',
  variant: 'terra-ClinicalApplication--default',
};

const ClinicalApplication = (props) => (
  <div />
);

ClinicalApplication.propTypes = propTypes;
ClinicalApplication.defaultProps = defaultProps;

export default ClinicalApplication;
