import React, { PropTypes } from 'react';

import SlidePanel from 'terra-slide-panel';
import NavigationController from 'terra-clinical-navigation-controller';

const PanelPresenter = ({ componentStack, behavior, position, size, isOpen, isMaximized, children, ...customProps }) => (
  <SlidePanel
    mainContent={children}
    panelContent={<NavigationController items={componentStack} />}
    isOpen={isOpen}
    panelBehavior={behavior}
    panelSize={size}
    panelPosition={position}
    isFullscreen={isMaximized}
    fill
    {...customProps}
  />
);

PanelPresenter.propTypes = {
  componentStack: PropTypes.array,
  behavior: PropTypes.string,
  position: PropTypes.string,
  size: PropTypes.string,
  isOpen: PropTypes.bool,
  isMaximized: PropTypes.bool,
  children: PropTypes.node,
};

PanelPresenter.defaultProps = {
  componentStack: [],
  behavior: 'overlay',
  position: 'end',
  size: 'small',
  isOpen: false,
  isMaximized: false,
};

export default PanelPresenter;
