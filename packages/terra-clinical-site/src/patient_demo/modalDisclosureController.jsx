import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ComponentRegistry from 'terra-clinical-application/src/navigation/core/registry/ComponentRegistry';
import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';

import { dismissModal, pushModal, popModal, maximizeModal } from './actions/shared/modalManager';

const modalDisclosureController = stateKey => (
  (WrappedComponent) => {
    class ModalDisclosureController extends React.Component {
      constructor(props) {
        super(props);

        this.dataForModalState = this.dataForModalState.bind(this);
      }

      dataForModalState() {
        const modalState = this.props.modalState;

        if (!modalState.isOpen) {
          return {
            isOpen: false,
            components: undefined,
          };
        }

        const components = modalState.componentKeys.map((componentKey, index) => {
          const componentData = modalState.components[componentKey];

          const ComponentClass = ComponentRegistry[componentData.name];

          if (!ComponentClass) {
            return undefined;
          }

          const appDelegate = AppDelegate.create({
            disclose: (data) => {
              this.props.pushModal({
                content: {
                  key: data.content.key,
                  name: data.content.name,
                  props: data.content.props,
                },
                size: data.size,
              });
            },
            dismiss: (index > 0 ?
              () => {
                this.props.popModal();
              } :
              () => {
                this.props.dismissModal();
              }
            ),
            closeDisclosure: () => { this.props.dismissModal(); },
            maximize: () => { this.props.maximizeModal(); },
            canGoBack: index > 0,
            isMaximized: modalState.isMaximized,
          });

          return <ComponentClass key={componentKey} {...componentData.props} app={appDelegate} />;
        });

        return {
          isOpen: true,
          isMaximized: modalState.isMaximized,
          componentStack: components,
          size: modalState.size,
        };
      }

      render() {
        return <WrappedComponent {...this.props} modalState={this.dataForModalState()} />;
      }
    }

    ModalDisclosureController.propTypes = {
      modalState: PropTypes.object,
      dismissModal: PropTypes.func,
      pushModal: PropTypes.func,
      popModal: PropTypes.func,
      maximizeModal: PropTypes.func,
    };

    ModalDisclosureController.displayName = (() => (
      `ModalDisclosureController(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
    ))();

    const mapStateToProps = state => (
      {
        modalState: state[stateKey],
      }
    );

    const mapDispatchToProps = dispatch => (
      {
        dismissModal: (data) => { dispatch(dismissModal(data)); },
        pushModal: (data) => { dispatch(pushModal(data)); },
        popModal: (data) => { dispatch(popModal(data)); },
        maximizeModal: (data) => { dispatch(maximizeModal(data)); },
      }
    );

    return connect(mapStateToProps, mapDispatchToProps)(ModalDisclosureController);
  }
);

export default modalDisclosureController;
