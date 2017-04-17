import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
} from 'react-router-dom';

import List from 'terra-list';
import ClinicalItemView from 'terra-clinical-item-view';
import Button from 'terra-button';
import Base from 'terra-base';

import PatientList from 'terra-clinical-application/src/patient-app/patient-list/PatientList';
import PatientDetail from 'terra-clinical-application/src/patient-app/patient-detail/PatientDetail';
import AppLayout from 'terra-clinical-application/src/navigation/layouts/app-layout/AppLayout';
import PrimaryNavLayout from 'terra-clinical-application/src/navigation/layouts/primary-nav-layout/PrimaryNavLayout';
import SecondaryNavLayout from 'terra-clinical-application/src/navigation/layouts/secondary-nav-layout/SecondaryNavLayout';
import SlidePanelLayout from 'terra-clinical-application/src/navigation/layouts/slide-panel-layout/SlidePanelLayout';
import PatientStore from 'terra-clinical-application/src/patient-app/patient-list/data/PatientStore';

const physicianId = 'physician1';

const generatePatientDetailsNav = (physicianIdInner) => {
  const patients = PatientStore.getPatientList(physicianIdInner);

  return (
    <div>
      <List>
        {
          patients.map(patient => (
            <List.Item
              key={`${patient.id}`}
              content={(
                <NavLink to={`/details/${patient.id}`} activeStyle={{ backgroundColor: 'lightgreen', display: 'block' }}>
                  <ClinicalItemView
                    displays={[
                      <ClinicalItemView.Display text={patient.name} />,
                      <ClinicalItemView.Display text={patient.status} />,
                    ]}
                  />
                </NavLink>
              )}
            />
          ))
        }
      </List>
    </div>
  );
};

// Custom app-prop forwarding Route
const LayoutRoute = ({ component: Component, app: appDelegate, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Component app={appDelegate} {...props} />
    )}
  />
);

LayoutRoute.propTypes = {
  app: React.PropTypes.object,
  component: React.PropTypes.node,
};

const ButtonLink = ({ title, ...rest }) => (
  <NavLink {...rest}>
    <Button text={title} style={{ marginLeft: '10px' }} />
  </NavLink>
);

const PatientListRoute = ({ app }) => (
  <SlidePanelLayout app={app}>
    <PatientList
      id="my-patient-list"
      physicianId={physicianId}
      key={'PATIENT_LIST_APP'}
    />
  </SlidePanelLayout>
);

const PatientDetailApp = ({ match, app }) => {
  return (
    <SlidePanelLayout app={app} key={`PATIENT_DETAIL_APP${match.params.id || '0'}`}>
      <PatientDetail
        physicianId={physicianId}
        patientId={match.params.id || '0'}
        key={'PATIENT_DETAIL_APP'}
      />
    </SlidePanelLayout>
  );
};

const PatientDetailsRoute = ({ app }) => (
  <SecondaryNavLayout
    app={app}
    navPanelContent={generatePatientDetailsNav(physicianId)}
    navPanelIsOpen
  >
    <LayoutRoute exact path="/details" component={PatientDetailApp} />
    <LayoutRoute path="/details/:id" component={PatientDetailApp} />
  </SecondaryNavLayout>
);

const PatientApp = () => (
  <Router>
    <Base style={{ height: '100%', width: '100%' }}>
      <AppLayout>
        <PrimaryNavLayout
          headerTitle="Patient Application"
          headerButtons={[
            <ButtonLink to="/" title="List" key="/list" />,
            <ButtonLink to="/details/0" title="Details" key="/details" />,
          ]}
          fill
        >
          <LayoutRoute exact path="/" component={PatientListRoute} />
          <LayoutRoute path="/details" component={PatientDetailsRoute} />
        </PrimaryNavLayout>
      </AppLayout>
    </Base>
  </Router>
);

export { PatientApp };
