import React, { PropTypes } from 'react';
import SlidePanel from 'terra-slide-panel';

import AppDelegate from '../../core/app-delegate/AppDelegate';

import NavStack from '../../../generic-components/nav-stack/NavStack';

class SlidePanelLayout extends React.Component {
  render() {
    const panelState = this.props.panelState;

    return (
      <SlidePanel
        className="orion-SlidePanelLayout"
        mainContent={this.props.children}
        panelContent={<NavStack items={panelState.componentStack} />}
        isOpen={panelState.isOpen}
        panelBehavior={panelState.behavior}
        panelSize={panelState.size}
        panelPosition="end"
        isFullscreen={panelState.isFullscreen}
        fill
      />
    );
  }
}

SlidePanelLayout.propTypes = {
  children: PropTypes.node,
  panelState: PropTypes.object,
  app: AppDelegate.propType,
};

export default SlidePanelLayout;
