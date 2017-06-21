import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Modal from 'react-modal';

import NavStack from '../../../generic-components/nav-stack/NavStack';

import './ModalDisclosurePresenter.scss';

class ModalDisclosurePresenter extends React.Component {
  render() {
    const modalState = this.props.modalState;

    const modalClassNames = classNames([
      'terra-ModalDisclosurePresenter-modal',
      { 'terra-ModalDisclosurePresenter-modal--small': !modalState.isMaximized && (modalState.size === 'small' || !modalState.size) },
      { 'terra-ModalDisclosurePresenter-modal--large': !modalState.isMaximized && modalState.size === 'large' },
      { 'terra-ModalDisclosurePresenter-modal--fullscreen': modalState.isMaximized },
    ]);

    return (
      <div className="terra-ModalDisclosurePresenter">
        {this.props.children}
        <Modal
          isOpen={modalState.isOpen}
          className={modalClassNames}
          overlayClassName="terra-ModalDisclosurePresenter-modalOverlay"
          contentLabel=""
        >
          <NavStack items={modalState.componentStack} />
        </Modal>
      </div>
    );
  }
}

ModalDisclosurePresenter.propTypes = {
  children: PropTypes.node,
  modalState: PropTypes.object,
};

export default ModalDisclosurePresenter;
