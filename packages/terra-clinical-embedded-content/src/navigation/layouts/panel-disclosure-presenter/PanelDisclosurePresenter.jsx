import React, { PropTypes } from 'react';
import SlidePanel from 'terra-slide-panel';

import NavStack from '../../../generic-components/nav-stack/NavStack';

class PanelDisclosurePresenter extends React.Component {
  render() {
    const panelState = this.props.panelState;

    return (
      <SlidePanel
        mainContent={this.props.children}
        panelContent={<NavStack items={panelState.componentStack} />}
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

PanelDisclosurePresenter.propTypes = {
  children: PropTypes.node,
  panelState: PropTypes.object,
};

export default PanelDisclosurePresenter;
