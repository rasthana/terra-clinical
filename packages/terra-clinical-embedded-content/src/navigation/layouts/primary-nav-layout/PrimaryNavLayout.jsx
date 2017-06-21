import React, { PropTypes } from 'react';
// import Button from 'terra-button';

import AppDelegate from '../../core/app-delegate/AppDelegate';
// import NavigationHeader from '../../core/navigation-header/NavigationHeader';
import ContentContainer from '../../../generic-components/content-container/ContentContainer';

import './PrimaryNavLayout.scss';

class PrimaryNavLayout extends React.Component {
  constructor(props) {
    super(props);

    this.renderNavHeader = this.renderNavHeader.bind(this);
  }

  renderNavHeader(headerTitle, headerButtons) {
    return (
      <div>
        <header className="orion-AppHeader">
          <h1 style={{ paddingLeft: '10px', paddingTop: '5px' }}>{headerTitle}</h1>
          {headerButtons}
        </header>
      </div>
    );
  }

  render() {
    return (
      <ContentContainer
        className="orion-PrimaryNavLayout"
        header={this.renderNavHeader(this.props.headerTitle, this.props.headerButtons)}
        fill={this.props.fill}
      >
        {React.Children.map(this.props.children, child => (React.cloneElement(child, { app: this.props.app })))}
      </ContentContainer>
    );
  }
}

PrimaryNavLayout.defaultProps = {
  navPanelIsOpen: true,
};

PrimaryNavLayout.propTypes = {
  headerTitle: PropTypes.string,
  headerButtons: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node,
  fill: PropTypes.bool,
  app: AppDelegate.propType,
};

export default PrimaryNavLayout;
