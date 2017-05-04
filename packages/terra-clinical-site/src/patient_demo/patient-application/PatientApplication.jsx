import React, { PropTypes } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import TerraApplication from '../terra-application/TerraApplication';

import ModalController, { reducers as modalControllerReducers } from '../terra-clinical-modal-controller/ModalController';

// import ModalDisclosurePresenter from 'terra-clinical-application/src/navigation/layouts/modal-disclosure-presenter/ModalDisclosurePresenter';
// import PanelDisclosurePresenter from 'terra-clinical-application/src/navigation/layouts/panel-disclosure-presenter/PanelDisclosurePresenter';
// import BottomPanelDisclosurePresenter from 'terra-clinical-application/src/navigation/layouts/bottom-panel-disclosure-presenter/BottomPanelDisclosurePresenter';

import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';

import PatientListController, { reducers as patientListReducers } from 'terra-clinical-application/src/patient-app/patient-list/PatientListController';
// import { appDelegateKey as EmbeddedContentKey } from 'terra-clinical-application/src/patient-app/embedded-content-consumer/EmbeddedContentConsumer';

// import modalDisclosureController from './modalDisclosureController';
// import panelDisclosureController from './panelDisclosureController';

// import { disclose as discloseModal } from './actions/shared/modal';
// import { disclose as disclosePanel } from './actions/shared/panel';

import patientApplication from './reducers/patientApplication';

const store = createStore(
  combineReducers(Object.assign({}, { patientApplication }, patientListReducers, modalControllerReducers)),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const physicianId = 'physician1';

// Create Redux-aware containers with the correct state mappings
// const PatientAppModalController = modalDisclosureController(['patientAppController', 'modalManager'])(ModalDisclosurePresenter);
// const PatientAppPanelController = panelDisclosureController(['patientAppController', 'panelManager'])(PanelDisclosurePresenter);

class PatientApplication extends React.Component {
  render() {
    // const rootAppDelegate = AppDelegate.create({
    //   disclose: (data) => {
    //     let contentStruct;
    //     if (data.content.fallbackUrl) {
    //       if (this.props.app && this.props.app.disclose) {
    //         this.props.app.disclose(data);
    //         return;
    //       }

    //       contentStruct = {
    //         content: {
    //           key: data.content.key,
    //           name: EmbeddedContentKey,
    //           props: {
    //             src: data.content.fallbackUrl,
    //             ...data.content.props,
    //           },
    //         },
    //       };
    //     } else {
    //       contentStruct = {
    //         content: {
    //           key: data.content.key,
    //           name: data.content.name,
    //           props: data.content.props,
    //         },
    //       };
    //     }

    //     if (data.preferredType === 'modal') {
    //       store.dispatch(discloseModal(Object.assign({}, contentStruct, {
    //         size: data.size,
    //       })));
    //     } else if (data.preferredType === 'panel') {
    //       store.dispatch(disclosePanel(Object.assign({}, contentStruct, {
    //         size: data.size,
    //         behavior: data.panelBehavior,
    //       })));
    //     }
    //   },
    //   dismiss: this.props.app && this.props.app.dismiss,
    //   closeDisclosure: this.props.app && this.props.app.closeDisclosure,
    //   maximize: this.props.app && this.props.app.maximize,
    //   canGoBack: this.props.app && this.props.app.canGoBack,
    //   isMaximized: this.props.app && this.props.app.isMaximized,
    //   disclosedAs: this.props.app && this.props.app.disclosedAs,
    //   availableDisclosureTypes: ['modal', 'panel'],
    // });

    return (
      <Provider store={store}>
        <TerraApplication style={{ height: '100%', width: '100%' }}>
          <ModalController>
            <PatientListController
              physicianId={physicianId}
              key={'PATIENT_LIST_APP'}
            />
          </ModalController>
        </TerraApplication>
      </Provider>
    );
  }
}

PatientApplication.propTypes = {
  app: AppDelegate.propType,
};

export default PatientApplication;
