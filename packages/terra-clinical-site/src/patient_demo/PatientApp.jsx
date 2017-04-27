import React from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import PatientAppController from './PatientAppController';
import patientAppController from './reducers/patientAppController';

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

const store = createStore(
  patientAppController,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const PatientApp = () => (
  <Provider store={store}>
    <PatientAppController />
  </Provider>
);

export default PatientApp;
