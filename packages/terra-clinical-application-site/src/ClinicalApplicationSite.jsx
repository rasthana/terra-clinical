import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './ClinicalApplicationSite.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

const defaultProps = {
  name: 'default',
  variant: 'terra-ClinicalApplicationSite--default',
};

const ClinicalApplicationSite = (props) => (
  <div />
);

ClinicalApplicationSite.propTypes = propTypes;
ClinicalApplicationSite.defaultProps = defaultProps;

export default ClinicalApplicationSite;
