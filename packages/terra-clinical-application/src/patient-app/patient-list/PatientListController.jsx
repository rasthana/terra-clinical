import React, { PropTypes } from 'react';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

import Placeholder from '../../generic-components/placeholder/Placeholder';

import PatientList from './PatientList';
import PatientStore from './data/PatientStore';

import PatientDetailController from '../patient-detail/PatientDetailController';

let patientListId = 0;

class PatientListController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      patientListData: props.patientListData,
    };

    this.getData = this.getData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.presentPatientDetail = this.presentPatientDetail.bind(this);
    this.presentNestedPatientList = this.presentNestedPatientList.bind(this);
  }

  componentDidMount() {
    if (!this.state.patientListData) {
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
      const patientListData = { patients: PatientStore.getPatientList(this.props.physicianId) };

      this.setState({ patientListData, isLoading: false });
    }, 3000);
  }

  onRefresh() {
    this.getData();
  }

  presentPatientDetail(patient, type) {
    this.props.app.disclose({
      content: (
        <PatientDetailController
          key={`detail_${patient.id}`}
          physicianId={this.props.physicianId}
          patientId={patient.id}
        />
      ),
      preferredType: type,
    });
  }

  presentNestedPatientList(type) {
    this.props.app.disclose({
      fallbackUrl: `${window.location.origin}/?type=${type}${Math.random()}`,
      preferredType: type,
      size: 'large',
      panelBehavior: 'overlay',
    });
  }

  render() {
    const { app, physicianId, patientListData, ...customProps } = this.props;

    if (!this.state.patientListData) {
      return <Placeholder app={app} headerText="Patient List Placeholder" loadingText="Loading patients..." />;
    } else {
      return (
        <PatientList
          {...customProps}
          app={app}
          data={this.state.patientListData}
          isLoading={this.state.isLoading}
          onRefresh={this.onRefresh}
          onSelectPatientDetail={this.presentPatientDetail}
          onShowPatientList={this.presentNestedPatientList}
        />
      )
    }
  }
}

PatientListController.propTypes = {
  app: AppDelegate.propType,
  physicianId: PropTypes.string,
  patientListData: PropTypes.object,
};

export default PatientListController;
