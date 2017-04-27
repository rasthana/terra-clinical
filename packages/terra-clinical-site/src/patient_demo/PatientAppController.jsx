import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ComponentRegistry from 'terra-clinical-application/src/navigation/core/registry/ComponentRegistry';

import ClinicalBase from 'terra-clinical-application/src/navigation/layouts/clinical-base/ClinicalBase';
import AppLayout from 'terra-clinical-application/src/navigation/layouts/app-layout/AppLayout';
import SlidePanelLayout from 'terra-clinical-application/src/navigation/layouts/slide-panel-layout/SlidePanelLayout';
// import BottomPanelLayout from 'terra-clinical-application/src/navigation/layouts/bottom-panel-layout/BottomPanelLayout';
import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';

import PatientListController from 'terra-clinical-application/src/patient-app/patient-list/PatientListController';

import { discloseModal, dismissModal, pushModal, popModal } from './actions/shared/modalManager';
import { disclosePanel, dismissPanel, pushPanel, popPanel } from './actions/shared/panelManager';

const physicianId = 'physician1';

class PatientAppController extends React.Component {
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
        goBack: (index > 0 ?
          () => { this.props.popModal(); } :
          undefined
        ),
        closeDisclosure: () => { this.props.dismissModal(); },
      });

      return <ComponentClass key={componentKey} {...componentData.props} app={appDelegate} />;
    });

    return {
      isOpen: true,
      size: modalState.size,
      componentStack: components,
    };
  }

  dataForPanelState() {
    const panelState = this.props.panelState;

    if (!panelState.isOpen) {
      return {
        isOpen: false,
        components: undefined,
      };
    }

    const components = panelState.componentKeys.map((componentKey, index) => {
      const componentData = panelState.components[componentKey];

      const ComponentClass = ComponentRegistry[componentData.name];

      if (!ComponentClass) {
        return undefined;
      }

      const appDelegate = AppDelegate.create({
        disclose: (data) => {
          debugger;
          if (data.preferredType === 'modal') {
            this.props.discloseModal({
              content: {
                key: data.content.key,
                name: data.content.name,
                props: data.content.props,
              },
              size: data.size,
            });
          } else {
            this.props.pushPanel({
              content: {
                key: data.content.key,
                name: data.content.name,
                props: data.content.props,
              },
            });
          }
        },
        dismiss: (index > 0 ?
          () => {
            this.props.popPanel();
          } :
          () => {
            this.props.dismissPanel();
          }
        ),
        goBack: (index > 0 ?
          () => { this.props.popPanel(); } :
          undefined
        ),
        closeDisclosure: () => { this.props.dismissPanel(); },
      });

      // TODO: Validate key approach
      // It'd be nice if we could use the componentKey as the actual key, as it would most likely mirror that of
      // one that would be given through props anyway. With this setup, a separate key set in props would take
      // precedent, if present.
      return <ComponentClass key={componentKey} {...componentData.props} app={appDelegate} />;
    });

    return {
      isOpen: true,
      behavior: panelState.behavior,
      size: panelState.size,
      componentStack: components,
    };
  }

  render() {
    const rootAppDelegate = AppDelegate.create({
      disclose: (data) => {
        if (data.preferredType === 'modal') {
          this.props.discloseModal({
            content: {
              key: data.content.key,
              name: data.content.name,
              props: data.content.props,
            },
            size: data.size,
          });
        } else if (data.preferredType === 'panel') {
          this.props.disclosePanel({
            content: {
              key: data.content.key,
              name: data.content.name,
              props: data.content.props,
            },
            size: data.size,
            behavior: data.panelBehavior,
          });
        }
      },
      dismiss: () => {},
    });

    return (
      <ClinicalBase style={{ height: '100%', width: '100%' }}>
        <AppLayout modalState={this.dataForModalState()}>
          <SlidePanelLayout panelState={this.dataForPanelState()}>
            <PatientListController
              app={rootAppDelegate}
              physicianId={physicianId}
              key={'PATIENT_LIST_APP'}
            />
          </SlidePanelLayout>
        </AppLayout>
      </ClinicalBase>
    );
  }
}

PatientAppController.propTypes = {
  modalState: PropTypes.object,
  discloseModal: PropTypes.func,
  dismissModal: PropTypes.func,
  pushModal: PropTypes.func,
  popModal: PropTypes.func,
  disclosePanel: PropTypes.func,
  dismissPanel: PropTypes.func,
  pushPanel: PropTypes.func,
  popPanel: PropTypes.func,
};

const mapStateToProps = state => (
  {
    modalState: state.modalManager,
    panelState: state.panelManager,
  }
);

const mapDispatchToProps = dispatch => (
  {
    discloseModal: (data) => { dispatch(discloseModal(data)); },
    dismissModal: (data) => { dispatch(dismissModal(data)); },
    pushModal: (data) => { dispatch(pushModal(data)); },
    popModal: (data) => { dispatch(popModal(data)); },
    disclosePanel: (data) => { dispatch(disclosePanel(data)); },
    dismissPanel: (data) => { dispatch(dismissPanel(data)); },
    pushPanel: (data) => { dispatch(pushPanel(data)); },
    popPanel: (data) => { dispatch(popPanel(data)); },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PatientAppController);
