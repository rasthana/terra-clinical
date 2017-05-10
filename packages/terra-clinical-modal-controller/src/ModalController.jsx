import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AppDelegate from 'terra-clinical-app-delegate';

import modalReducers from './reducers/modalController';
import { disclose, dismiss, push, pop, maximize, minimize } from './actions/modalController';
import ModalPresenter from './ModalPresenter';

class ModalController extends React.Component {
  constructor(props) {
    super(props);

    this.componentsFromModalState = this.componentsFromModalState.bind(this);
  }

  componentsFromModalState() {
    if (!this.props.componentKeys || !this.props.componentKeys.length) {
      return null;
    }

    return this.props.componentKeys.map((componentKey, index) => {
      const componentData = this.props.componentDirectory[componentKey];

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
        goBack: index > 0 ? () => { this.props.popModal(); } : null,
        maximize: !this.props.isMaximized ? () => { this.props.maximizeModal(); } : null,
        minimize: this.props.isMaximized ? () => { this.props.minimizeModal(); } : null,
      });

      return <ComponentClass key={componentKey} {...componentData.props} app={appDelegate} />;
    });
  }

  render() {
    const { app, discloseModal, size, isOpen, isMaximized, children } = this.props;

    return (
      <ModalPresenter
        componentStack={this.componentsFromModalState()}
        size={size}
        isOpen={isOpen}
        isMaximized={isMaximized}
      >
        {React.Children.map(children, (child) => {
          const childAppDelegate = AppDelegate.createDescendant(app, {
            disclose: (data) => {
              discloseModal(data);
            },
          });

          return React.cloneElement(child, { app: childAppDelegate });
        })}
      </ModalPresenter>
    );
  }
}

ModalController.propTypes = {
  app: AppDelegate.propType,
  children: PropTypes.node,

  componentKeys: PropTypes.array,
  componentDirectory: PropTypes.object,
  size: PropTypes.string,
  isOpen: PropTypes.bool,
  isMaximized: PropTypes.bool,

  discloseModal: PropTypes.func,
  dismissModal: PropTypes.func,
  pushModal: PropTypes.func,
  popModal: PropTypes.func,
  maximizeModal: PropTypes.func,
  minimizeModal: PropTypes.func,
};

const mapStateToProps = state => (
  (disclosureState => ({
    componentKeys: disclosureState.componentKeys,
    componentDirectory: disclosureState.components,
    size: disclosureState.size,
    isOpen: disclosureState.isOpen,
    isMaximized: disclosureState.isMaximized,
  }))(state.modalController)
);

const mapDispatchToProps = dispatch => ({
  discloseModal: (data) => { dispatch(disclose(data)); },
  dismissModal: (data) => { dispatch(dismiss(data)); },
  pushModal: (data) => { dispatch(push(data)); },
  popModal: (data) => { dispatch(pop(data)); },
  maximizeModal: (data) => { dispatch(maximize(data)); },
  minimizeModal: (data) => { dispatch(minimize(data)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalController);

const reducers = {
  modalController: modalReducers,
};

export { reducers };
