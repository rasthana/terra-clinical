import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ComponentRegistry from 'terra-clinical-application/src/navigation/core/registry/ComponentRegistry';

import ClinicalBase from 'terra-clinical-application/src/navigation/layouts/clinical-base/ClinicalBase';
import ModalDisclosurePresenter from 'terra-clinical-application/src/navigation/layouts/modal-disclosure-presenter/ModalDisclosurePresenter';
import PanelDisclosurePresenter from 'terra-clinical-application/src/navigation/layouts/panel-disclosure-presenter/PanelDisclosurePresenter';
import BottomPanelDisclosurePresenter from 'terra-clinical-application/src/navigation/layouts/bottom-panel-disclosure-presenter/BottomPanelDisclosurePresenter';

import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';

import PatientListController from 'terra-clinical-application/src/patient-app/patient-list/PatientListController';
import EmbeddedContentConsumer from 'terra-clinical-application/src/patient-app/embedded-content-consumer/EmbeddedContentConsumer';

import modalDisclosureController from './modalDisclosureController';
import panelDisclosureController from './panelDisclosureController';

import { discloseModal } from './actions/shared/modalManager';
import { disclosePanel } from './actions/shared/panelManager';

const physicianId = 'physician1';

const PatientAppModalController = modalDisclosureController('modalManager')(ModalDisclosurePresenter);
const PatientAppPanelController = panelDisclosureController('panelManager')(BottomPanelDisclosurePresenter);

class PatientAppController extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootAppDelegate = AppDelegate.create({
      disclose: (data) => {
        let contentStruct;
        if (data.content.fallbackUrl) {
          if (this.props.app && this.props.app.disclose) {
            this.props.app.disclose(data);
            return;
          }

          contentStruct = {
            content: {
              key: data.content.key,
              name: EmbeddedContentConsumer.disclosureKey,
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

        if (data.preferredType === 'modal') {
          this.props.discloseModal(Object.assign({}, contentStruct, {
            size: data.size
          }));
        } else if (data.preferredType === 'panel') {
          this.props.disclosePanel(Object.assign({}, contentStruct, {
            size: data.size,
            behavior: data.panelBehavior,
          }));
        }
      },
      dismiss: this.props.app && this.props.app.dismiss,
      closeDisclosure: this.props.app && this.props.app.closeDisclosure,
      canGoBack: this.props.app && this.props.app.canGoBack,
    });

    return (
      <ClinicalBase style={{ height: '100%', width: '100%' }}>
        <PatientAppModalController app={rootAppDelegate}>
          <PatientAppPanelController app={rootAppDelegate}>
            <PatientListController
              app={rootAppDelegate}
              physicianId={physicianId}
              key={'PATIENT_LIST_APP'}
            />
          </PatientAppPanelController>
        </PatientAppModalController>
      </ClinicalBase>
    );
  }
}

PatientAppController.propTypes = {
  app: AppDelegate.propType,
  discloseModal: PropTypes.func,
  disclosePanel: PropTypes.func,
};

const mapDispatchToProps = dispatch => (
  {
    discloseModal: (data) => { dispatch(discloseModal(data)); },
    disclosePanel: (data) => { dispatch(disclosePanel(data)); },
  }
);

export default connect(null, mapDispatchToProps)(PatientAppController);
