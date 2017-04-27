import React, { PropTypes } from 'react';

import AppDelegate from '../../core/app-delegate/AppDelegate';

import NavStack from '../../../generic-components/nav-stack/NavStack';

import './BottomPanelLayout.scss';

class BottomPanelLayout extends React.Component {
  render() {
    const panelState = this.props.panelState;

    let classNames = 'orion-BottomPanelLayout';
    if (panelState.isOpen) {
      classNames = `${classNames} orion-BottomPanelLayout--is-open`;
    }

    return (
      <div className={classNames}>
        <div className="orion-BottomPanelLayout-content">
          {this.props.children}
        </div>
        <div className="orion-BottomPanelLayout-panel">
          <NavStack items={panelState.componentStack} />
        </div>
      </div>
    );
  }
}

BottomPanelLayout.propTypes = {
  children: PropTypes.node,
  app: AppDelegate.propType,
  panelState: PropTypes.object,
};

export default BottomPanelLayout;
