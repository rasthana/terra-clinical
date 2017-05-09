import React, { PropTypes } from 'react';

import SlidePanel from 'terra-slide-panel';
import NavigationController from 'terra-clinical-navigation-controller';

class PanelPresenter extends React.Component {
  render() {
    const panelState = this.props.panelState;

    return (
      <SlidePanel
        mainContent={this.props.children}
        panelContent={<NavigationController items={panelState.componentStack} />}
        isOpen={panelState.isOpen}
        panelBehavior={panelState.behavior}
        panelSize={panelState.size}
        panelPosition="end"
        isFullscreen={panelState.isMaximized}
        fill
      />
    );
  }
}

PanelPresenter.propTypes = {
  children: PropTypes.node,
  panelState: PropTypes.object,
};

export default PanelPresenter;
