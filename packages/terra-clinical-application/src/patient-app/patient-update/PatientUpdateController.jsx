import React, { PropTypes } from 'react';
import Button from 'terra-button';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

import Placeholder from '../../generic-components/placeholder/Placeholder';

import PatientStore from '../patient-list/data/PatientStore';

import PatientUpdate from './PatientUpdate';

class PatientUpdateController extends React.Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    this.state = {
      isLoading: false,
      patientUpdateData: props.patientUpdateData,
    };
  }

  componentDidMount() {
    if (!this.state.patientUpdateData) {
      this.getData();
    }
  }

  getData(url) {
    this.setState({ isLoading: true });

    // GET DATA WITH URL
    this.getDataTimeout = setTimeout(() => {
      this.setState({ patientUpdateData: PatientStore.getPatient(this.props.physicianId, this.props.patientId), isLoading: false });
    }, 3000);
  }

  handleSubmit(patient, changeData) {
    PatientStore.update(this.props.physicianId, patient.id, changeData);

    this.props.app.dismiss();
  }

  handleCancel() {
    this.props.app.dismiss();
  }

  render() {
    const patient = this.state.patientUpdateData;

    if (!patient) {
      return <Placeholder app={this.props.app} headerText="Patient Update Placeholder" loadingText="Loading patient..." />;
    }

    return (
      <PatientUpdate
        app={this.props.app}
        patient={patient}
        isLoading={this.state.isLoading}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
      />
    );
  }
}

PatientUpdateController.propTypes = {
  app: AppDelegate.propType,
  physicianId: PropTypes.string,
  patientId: PropTypes.string,
  patientUpdateData: PropTypes.object,
};

export default PatientUpdateController;
