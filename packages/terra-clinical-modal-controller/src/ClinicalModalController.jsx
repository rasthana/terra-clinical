import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './ClinicalModalController.scss';

const propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

const defaultProps = {
  name: 'default',
  variant: 'terra-ClinicalModalController--default',
};

const ClinicalModalController = (props) => (
  <div />
);

ClinicalModalController.propTypes = propTypes;
ClinicalModalController.defaultProps = defaultProps;

export default ClinicalModalController;
