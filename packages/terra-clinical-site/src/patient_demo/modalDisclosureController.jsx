import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';
import EmbeddedContentConsumer from 'terra-clinical-application/src/patient-app/embedded-content-consumer/EmbeddedContentConsumer';

import { dismiss, push, pop, toggleMaximize } from './actions/shared/modal';

AppDelegate.registerComponent('EmbeddedContentConsumer', EmbeddedContentConsumer);

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

          const ComponentClass = AppDelegate.getComponent(componentData.name);

          if (!ComponentClass) {
            return undefined;
          }

          const appDelegate = AppDelegate.create({
            disclose: (data) => {
              let contentStruct;
              if (data.content.fallbackUrl) {
                contentStruct = {
                  content: {
                    key: data.content.key,
                    name: 'EmbeddedContentConsumer',
                    props: {
                      src: data.content.fallbackUrl,
                    },
                  },
                };
              } else {
                contentStruct = {
                  content: {
                    key: data.content.key,
                    name: data.content.name,
                    props: data.content.props,
                  },
                };
              }

              this.props.pushModal(Object.assign({}, contentStruct, {
                size: data.size,
              }));
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
      app: AppDelegate.propType,
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
        dismissModal: (data) => { dispatch(dismiss(data)); },
        pushModal: (data) => { dispatch(push(data)); },
        popModal: (data) => { dispatch(pop(data)); },
        maximizeModal: (data) => { dispatch(toggleMaximize(data)); },
      }
    );

    return connect(mapStateToProps, mapDispatchToProps)(ModalDisclosureController);
  }
);

export default modalDisclosureController;
