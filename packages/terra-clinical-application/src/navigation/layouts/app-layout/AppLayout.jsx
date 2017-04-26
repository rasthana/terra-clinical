import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Modal from 'react-modal';

import NavStack from '../../../generic-components/nav-stack/NavStack';

import './AppLayout.scss';

class AppLayout extends React.Component {
  render() {
    const modalState = this.props.modalState;

    const modalClassNames = classNames([
      'terra-AppLayout-modal',
      { 'terra-AppLayout-modal--small': modalState.size === 'small' || !modalState.size },
      { 'terra-AppLayout-modal--large': modalState.size === 'large' },
    ]);

    return (
      <div className="terra-AppLayout">
        {this.props.children}
        <Modal
          isOpen={modalState.isOpen}
          className={modalClassNames}
          overlayClassName="terra-AppLayout-modalOverlay"
          contentLabel=""
        >
          <NavStack items={modalState.componentStack} />
        </Modal>
      </div>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.node,
  modalState: PropTypes.object,
};

export default AppLayout;
