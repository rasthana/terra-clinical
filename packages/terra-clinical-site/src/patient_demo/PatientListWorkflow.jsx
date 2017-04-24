import React, { PropTypes } from 'react';

import AppDelegate from 'terra-clinical-application/src/navigation/core/app-delegate/AppDelegate';

import PatientListLoader from 'terra-clinical-application/src/patient-app/patient-list/PatientListLoader';
import PatientDetailLoader from 'terra-clinical-application/src/patient-app/patient-detail/PatientDetailLoader';
import PatientUpdateLoader from 'terra-clinical-application/src/patient-app/patient-update/PatientUpdateLoader';

class PatientListWorkflow extends React.Component {
  render() {
    const { app, physicianId, key } = this.props;

    return (
      <PatientListLoader
        app={app}
        url={physicianId}
        key={key}
        onSelectPatientDetail={(app, patient, type) => {
          app.disclose({
            content: (
              <PatientDetailLoader
                key={`detail_${patient.id}`}
                url={patient.id}
                onSelectPatientUpdate={(app, patient, type) => {
                  app.disclose({
                    content: (
                      <PatientUpdateLoader
                        key={`update_${patient.id}`}
                        url={patient.id}
                        onSubmit={(app, patient, changeData) => {
                          PatientStore.update('physician1', patient.id, changeData);

                          app.dismiss();
                        }}
                        onCancel={(app, patient) => {
                          app.dismiss();
                        }}
                      />
                    ),
                    preferredType: type,
                  })
                }}
              />
            ),
            preferredType: type,
          });
        }}
        onShowPatientList={(type) => {
          this.props.app.disclose({
            fallbackUrl: `${window.location.origin}/?type=${type}`,
            preferredType: type,
            size: 'large',
            panelBehavior: 'overlay',
          });
        }}
      />
    );
  }
}

PatientListWorkflow.propTypes = {
  app: AppDelegate.propType,
  physicianId: PropTypes.string,
};

export default PatientListWorkflow;
