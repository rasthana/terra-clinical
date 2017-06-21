import React, { PropTypes } from 'react';

import NavStack from '../../../generic-components/nav-stack/NavStack';

import './BottomPanelDisclosurePresenter.scss';

class BottomPanelDisclosurePresenter extends React.Component {
  render() {
    const panelState = this.props.panelState;

    let classNames = 'orion-BottomPanelDisclosurePresenter';
    if (panelState.isOpen) {
      classNames = `${classNames} orion-BottomPanelDisclosurePresenter--is-open`;
    }

    return (
      <div className={classNames}>
        <div className="orion-BottomPanelDisclosurePresenter-content">
          {this.props.children}
        </div>
        <div className="orion-BottomPanelDisclosurePresenter-panel">
          <NavStack items={panelState.componentStack} />
        </div>
      </div>
    );
  }
}

BottomPanelDisclosurePresenter.propTypes = {
  children: PropTypes.node,
  panelState: PropTypes.object,
};

export default BottomPanelDisclosurePresenter;
