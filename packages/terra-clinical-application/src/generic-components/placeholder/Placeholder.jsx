import React, { PropTypes } from 'react';

import ContentContainer from '../content-container/ContentContainer';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

const propTypes = {
  app: AppDelegate.propType,
  headerText: PropTypes.string,
  loadingText: PropTypes.string,
};

const defaultProps = {
  headerText: 'Placeholder',
  loadingText: 'Loading',
};

const Placeholder = props => (
  <ContentContainer
    header={<NavigationHeader title={props.headerText} app={props.app} />}
    fill
  >
    <h2>{props.loadingText}</h2>
  </ContentContainer>
);

Placeholder.propTypes = propTypes;
Placeholder.defaultProps = defaultProps;

export default Placeholder;
