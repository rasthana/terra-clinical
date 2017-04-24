import React, { PropTypes } from 'react';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

import Placeholder from '../../generic-components/placeholder/Placeholder';

import PatientDetail from './PatientDetail';
import PatientLoader from '../data/PatientLoader';

import PatientUpdateController from '../patient-update/PatientUpdateController';

class PatientDetailController extends React.Component {
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
    this.presentPatientUpdate = this.presentPatientUpdate.bind(this);

    this.state = {
      isLoading: false,
      patient: props.patient,
    };

    this.loader = new PatientLoader({
      dataKey: 'patient',
      onStoreUpdate: () => {
        this.refresh();
      },
      onChange: (loaderState) => {
        this.setState(loaderState);
      }
    })
  }

  componentDidMount() {
    if (!this.state.patient) {
      this.refresh();
    }
  }

  componentWillUnmount() {
    this.loader.destroy();
  }

  refresh() {
    this.loader.getPatient(this.props.physicianId, this.props.patientId);
  }

  presentPatientUpdate(patient, type) {
    debugger;

    this.props.app.disclose({
      content: (
        <PatientUpdateController
          key={`update_${patient.id}`}
          physicianId={this.props.physicianId}
          patientId={this.props.patientId}
        />
      ),
      preferredType: type,
    })
  }

  render() {
    const { app, patient, physicianId, patientId, ...customProps } = this.props;

    if (!this.state.patient) {
      return <Placeholder app={app} headerText="Patient Detail" loadingText="Loading patient..." />;
    } else {
      return (
        <PatientDetail
          {...customProps}
          app={app}
          patient={this.state.patient}
          isLoading={this.state.isLoading}
          onRefresh={this.refresh}
          onSelectPatientUpdate={this.presentPatientUpdate}
        />
      )
    }
  }
}

PatientDetailController.propTypes = {
  app: AppDelegate.propType,
  physicianId: PropTypes.string,
  patientId: PropTypes.string,
  patient: PropTypes.object,
};

export default PatientDetailController;

