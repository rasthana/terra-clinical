import React, { PropTypes } from 'react';
import classNames from 'classnames';
import SlidePanel from 'terra-slide-panel';

import AppDelegate from '../../core/app-delegate/AppDelegate';

import ContentContainer from '../../../generic-components/content-container/ContentContainer';

import './SecondaryNavLayout.scss';

class SecondaryNavLayout extends React.Component {
  constructor(props) {
    super(props);

    this.renderNavigationSlidePanel = this.renderNavigationSlidePanel.bind(this);

    this.state = {
      navPanel: {
        isOpen: true,
      },
    };
  }

  // Rendering

  renderNavigationSlidePanel() {
    return (
      <SlidePanel
        panelPosition="start"
        isOpen
        fill
        panelBehavior="squish"
        panelContent={this.props.navPanelContent}
        mainContent={React.Children.map(this.props.children, child => (React.cloneElement(child, { app: this.props.app })))}
      />
    );
  }

  render() {
    const classes = classNames(['orion-SecondaryNavLayout']);

    return (
      <ContentContainer
        className={classes}
        header={this.props.header}
        fill
      >
        {this.renderNavigationSlidePanel()}
      </ContentContainer>
    );
  }
}

SecondaryNavLayout.defaultProps = {
  navPanelIsOpen: true,
};

SecondaryNavLayout.propTypes = {
  app: AppDelegate.propType,
  header: PropTypes.node,
  navPanelIsOpen: PropTypes.bool,
  navPanelContent: PropTypes.node,
  children: PropTypes.node,
};

export default SecondaryNavLayout;
