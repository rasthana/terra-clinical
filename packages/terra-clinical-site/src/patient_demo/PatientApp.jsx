import React, { PropTypes } from 'react';

import ComponentRegistry from 'terra-clinical-application/src/navigation/core/registry/ComponentRegistry';

import ClinicalBase from 'terra-clinical-application/src/navigation/layouts/clinical-base/ClinicalBase';
import AppLayout from 'terra-clinical-application/src/navigation/layouts/app-layout/AppLayout';
import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';

import PatientListController from 'terra-clinical-application/src/patient-app/patient-list/PatientListController';

import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

import { discloseModal, dismissModal, pushModal, popModal } from './actions/actions';
import patientApp from './reducers/reducers';

const physicianId = 'physician1';

// const generatePatientDetailsNav = (physicianIdInner) => {
//   const patients = PatientStore.getPatientList(physicianIdInner);

//   return (
//     <div>
//       <List>
//         {
//           patients.map(patient => (
//             <List.Item
//               key={`${patient.id}`}
//               content={(
//                 <NavLink to={`/details/${patient.id}`} activeStyle={{ backgroundColor: 'lightgreen', display: 'block' }}>
//                   <ClinicalItemView
//                     displays={[
//                       <ClinicalItemView.Display text={patient.name} />,
//                       <ClinicalItemView.Display text={patient.status} />,
//                     ]}
//                   />
//                 </NavLink>
//               )}
//             />
//           ))
//         }
//       </List>
//     </div>
//   );
// };

// // Custom app-prop forwarding Route
// const LayoutRoute = ({ component: Component, app: appDelegate, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => (
//       <Component app={appDelegate} {...props} />
//     )}
//   />
// );

// LayoutRoute.propTypes = {
//   app: React.PropTypes.object,
//   component: React.PropTypes.node,
// };

// const ButtonLink = ({ title, ...rest }) => (
//   <NavLink {...rest}>
//     <Button text={title} style={{ marginLeft: '10px' }} />
//   </NavLink>
// );

// const PatientListRoute = ({ app }) => (
//   <SlidePanelLayout app={app}>
//     <PatientListController
//       physicianId={physicianId}
//       key={'PATIENT_LIST_APP'}
//     />
//   </SlidePanelLayout>
// );

// const AlternatePatientListRoute = ({ app }) => (
//   <BottomPanelLayout app={app}>
//     <PatientListController
//       physicianId={physicianId}
//       key={'PATIENT_LIST_APP'}
//     />
//   </BottomPanelLayout>
// );

// const PatientDetailApp = ({ match, app }) => {
//   return (
//     <SlidePanelLayout app={app} key={`PATIENT_DETAIL_APP${match.params.id || '0'}`}>
//       <PatientDetailController
//         physicianId={physicianId}
//         patientId={match.params.id || '0'}
//         key={'PATIENT_DETAIL_APP'}
//       />
//     </SlidePanelLayout>
//   );
// };

// const PatientDetailsRoute = ({ app }) => (
//   <SecondaryNavLayout
//     app={app}
//     navPanelContent={generatePatientDetailsNav(physicianId)}
//     navPanelIsOpen
//   >
//     <LayoutRoute exact path="/details" component={PatientDetailApp} />
//     <LayoutRoute path="/details/:id" component={PatientDetailApp} />
//   </SecondaryNavLayout>
// );

class PatientAppViewController extends React.Component {
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

      return <ComponentClass {...componentData.props} app={appDelegate} />;
    });

    return {
      isOpen: true,
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
        } else {
          console.log('Only modals right now');
        }
      },
      dismiss: () => {},
    });

    return (
      <ClinicalBase style={{ height: '100%', width: '100%' }}>
        <AppLayout modalState={this.dataForModalState()}>
          <PatientListController
            app={rootAppDelegate}
            physicianId={physicianId}
            key={'PATIENT_LIST_APP'}
          />
        </AppLayout>
      </ClinicalBase>
    );
  }
}

PatientAppViewController.propTypes = {
  modalState: PropTypes.object,
  panelState: PropTypes.object,
  mainState: PropTypes.object,
  discloseModal: PropTypes.func,
  dismissModal: PropTypes.func,
  pushModal: PropTypes.func,
  popModal: PropTypes.func,
};

const mapStateToProps = state => (
  {
    modalState: state.modalManager,
    panelState: state.panelManager,
    mainState: state.mainManager,
  }
);

const mapDispatchToProps = dispatch => (
  {
    discloseModal: (data) => { dispatch(discloseModal(data)); },
    dismissModal: (data) => { dispatch(dismissModal(data)); },
    pushModal: (data) => { dispatch(pushModal(data)); },
    popModal: (data) => { dispatch(popModal(data)); },
  }
);

const ConnectedPatientAppViewController = connect(mapStateToProps, mapDispatchToProps)(PatientAppViewController);

const store = createStore(patientApp);

const PatientApp = () => (
  <Provider store={store}>
    <ConnectedPatientAppViewController />
  </Provider>
);


export default PatientApp;
