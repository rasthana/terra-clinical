import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Modal from 'react-modal';
import NavigationController from 'terra-clinical-navigation-controller';

import './ModalPresenter.scss';

class ModalPresenter extends React.Component {
  render() {
    const modalState = this.props.modalState;

    const modalClassNames = classNames([
      'terraClinical-ModalPresenter-modal',
      { 'terraClinical-ModalPresenter-modal--small': !modalState.isMaximized && (modalState.size === 'small' || !modalState.size) },
      { 'terraClinical-ModalPresenter-modal--large': !modalState.isMaximized && modalState.size === 'large' },
      { 'terraClinical-ModalPresenter-modal--fullscreen': modalState.isMaximized },
    ]);

    return (
      <div className="terraClinical-ModalPresenter">
        {this.props.children}
        <Modal
          isOpen={modalState.isOpen}
          className={modalClassNames}
          overlayClassName="terraClinical-ModalPresenter-modalOverlay"
          contentLabel=""
        >
          <NavigationController items={modalState.componentStack} />
        </Modal>
      </div>
    );
  }
}

ModalPresenter.propTypes = {
  children: PropTypes.node,
  modalState: PropTypes.object,
};

export default ModalPresenter;
