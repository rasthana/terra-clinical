import React, { PropTypes } from 'react';

import SlidePanel from 'terra-slide-panel';
import NavigationController from 'terra-clinical-navigation-controller';

const PanelPresenter = ({ componentStack, behavior, size, isOpen, isMaximized, children, ...customProps }) => (
  <SlidePanel
    mainContent={children}
    panelContent={<NavigationController items={componentStack} />}
    isOpen={isOpen}
    panelBehavior={behavior}
    panelSize={size}
    panelPosition="end"
    isFullscreen={isMaximized}
    fill
    {...customProps}
  />
);

PanelPresenter.propTypes = {
  componentStack: PropTypes.array,
  behavior: PropTypes.string,
  size: PropTypes.string,
  isOpen: PropTypes.bool,
  isMaximized: PropTypes.bool,
  children: PropTypes.node,
};

export default PanelPresenter;
