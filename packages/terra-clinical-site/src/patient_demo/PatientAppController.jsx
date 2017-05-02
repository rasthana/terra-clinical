import React, { PropTypes } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import Base from 'terra-base';

import ModalDisclosurePresenter from 'terra-clinical-application/src/navigation/layouts/modal-disclosure-presenter/ModalDisclosurePresenter';
import PanelDisclosurePresenter from 'terra-clinical-application/src/navigation/layouts/panel-disclosure-presenter/PanelDisclosurePresenter';
import BottomPanelDisclosurePresenter from 'terra-clinical-application/src/navigation/layouts/bottom-panel-disclosure-presenter/BottomPanelDisclosurePresenter';

import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';

import PatientListController, { reducers as patientListReducers } from 'terra-clinical-application/src/patient-app/patient-list/PatientListController';
import { appDelegateKey as EmbeddedContentKey } from 'terra-clinical-application/src/patient-app/embedded-content-consumer/EmbeddedContentConsumer';

import modalDisclosureController from './modalDisclosureController';
import panelDisclosureController from './panelDisclosureController';

import { disclose as discloseModal } from './actions/shared/modal';
import { disclose as disclosePanel } from './actions/shared/panel';

import patientAppController from './reducers/patientAppController';

const store = createStore(
  combineReducers(Object.assign({}, { patientAppController }, patientListReducers )),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const physicianId = 'physician1';

// Create Redux-aware containers with the correct state mappings
const PatientAppModalController = modalDisclosureController(['patientAppController', 'modalManager'])(ModalDisclosurePresenter);
const PatientAppPanelController = panelDisclosureController(['patientAppController', 'panelManager'])(PanelDisclosurePresenter);

class PatientAppController extends React.Component {
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
              name: EmbeddedContentKey,
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
          store.dispatch(discloseModal(Object.assign({}, contentStruct, {
            size: data.size
          })));
        } else if (data.preferredType === 'panel') {
          store.dispatch(disclosePanel(Object.assign({}, contentStruct, {
            size: data.size,
            behavior: data.panelBehavior,
          })));
        }
      },
      dismiss: this.props.app && this.props.app.dismiss,
      closeDisclosure: this.props.app && this.props.app.closeDisclosure,
      maximize: this.props.app && this.props.app.maximize,
      canGoBack: this.props.app && this.props.app.canGoBack,
    });

    return (
      <Provider store={store}>
        <Base style={{ height: '100%', width: '100%' }}>
          <PatientAppModalController app={rootAppDelegate}>
            <PatientAppPanelController app={rootAppDelegate}>
              <PatientListController
                app={rootAppDelegate}
                physicianId={physicianId}
                key={'PATIENT_LIST_APP'}
              />
            </PatientAppPanelController>
          </PatientAppModalController>
        </Base>
      </Provider>
    );
  }
}

PatientAppController.propTypes = {
  app: AppDelegate.propType,
};

export default PatientAppController;
