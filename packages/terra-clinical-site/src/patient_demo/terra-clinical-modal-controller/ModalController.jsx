import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';
import ModalPresenter from './ModalPresenter';

import modalReducers from './reducers/modalController';
import { disclose, dismiss, push, pop, toggleMaximize } from './actions/modalController';

class ModalController extends React.Component {
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
          this.props.pushModal(data);
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
        maximize: () => { this.props.toggleMaximizeModal(); },
        canGoBack: index > 0,
        isMaximized: modalState.isMaximized,
        disclosedAs: 'modal',
        availableDisclosureTypes: 'modal',
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
    const { app, modalState, discloseModal, dismissModal, pushModal, popModal, maximizeModal, children } = this.props;

    return (
      <ModalPresenter modalState={this.dataForModalState()}>
        {React.Children.map(children, child => {
          const app = AppDelegate.create({
            disclose: (data) => {
              discloseModal(data);
            },
            dismiss: app && app.dismiss,
            closeDisclosure: app && app.closeDisclosure,
            maximize: app && app.maximize,
            isMaximized: app && app.isMaximized,
            canGoBack: app && app.canGoBack,
            disclosedAs: app && app.disclosedAs,
            availableDisclosureTypes: Object.assign([], app && app.availableDisclosureTypes, ['modal']),
          });

          return React.cloneElement(child, { app });
        })}
      </ModalPresenter>
    );
  }
}

ModalController.propTypes = {
  app: AppDelegate.propType,
  children: PropTypes.node,
  modalState: PropTypes.object,
  discloseModal: PropTypes.func,
  dismissModal: PropTypes.func,
  pushModal: PropTypes.func,
  popModal: PropTypes.func,
  maximizeModal: PropTypes.func,
};

const mapStateToProps = (state) => {
  return { modalState: state.modalController };
};

const mapDispatchToProps = dispatch => (
  {
    discloseModal: (data) => { dispatch(disclose(data)); },
    dismissModal: (data) => { dispatch(dismiss(data)); },
    pushModal: (data) => { dispatch(push(data)); },
    popModal: (data) => { dispatch(pop(data)); },
    toggleMaximizeModal: (data) => { dispatch(toggleMaximize(data)); },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ModalController);

const reducers = {
  modalController: modalReducers,
}

export { reducers };
