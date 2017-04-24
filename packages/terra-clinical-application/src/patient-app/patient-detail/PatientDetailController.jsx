import React, { PropTypes } from 'react';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

import Placeholder from '../../generic-components/placeholder/Placeholder';

import PatientStore from '../patient-list/data/PatientStore';
import PatientDetail from './PatientDetail';

import PatientUpdateController from '../patient-update/PatientUpdateController';

class PatientDetailController extends React.Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.presentPatientUpdate = this.presentPatientUpdate.bind(this);

    this.state = {
      isLoading: false,
      patient: props.patient,
    };
  }

  componentDidMount() {
    if (!this.state.patientDetailData) {
      this.getData();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.getDataTimeout);
  }

  getData() {
    this.setState({ isLoading: true });

    // GET DATA WITH URL
    this.getDataTimeout = setTimeout(() => {
      this.setState({ patient: PatientStore.getPatient(this.props.physicianId, this.props.patientId), isLoading: false });
    }, 3000);
  }

  onRefresh() {
    this.getData();
  }

  presentPatientUpdate(patient, type) {
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
      return <Placeholder app={app} headerText="Patient Detail Placeholder" loadingText="Loading patient..." />;
    } else {
      return (
        <PatientDetail
          {...customProps}
          app={app}
          patient={this.state.patient}
          isLoading={this.state.isLoading}
          onRefresh={this.onRefresh}
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

