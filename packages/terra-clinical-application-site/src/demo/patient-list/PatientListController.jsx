import React, { PropTypes } from 'react';

import AppDelegate from 'terra-clinical-app-delegate';

// import Placeholder from '../../generic-components/placeholder/Placeholder';

import PatientList from './PatientList';
import PatientLoader from '../data/PatientLoader';
import patientListController from './reducers/patientListController';

import { appDelegateKey as PatientDetailKey, reducers as patientDetailReducers } from '../patient-detail/PatientDetailController';

class PatientListController extends React.Component {
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
    this.presentPatientDetail = this.presentPatientDetail.bind(this);

    this.state = {
      isLoading: false,
      patientListData: props.patientListData,
    };

    this.loader = new PatientLoader({
      dataKey: 'patientListData',
      onStoreUpdate: () => {
        this.refresh();
      },
      onChange: (loaderState) => {
        this.setState(loaderState);
      },
    });
  }

  componentDidMount() {
    if (!this.state.patientListData) {
      this.refresh();
    }
  }

  componentWillUnmount() {
    this.loader.destroy();
  }

  refresh() {
    this.loader.getPatientList(this.props.physicianId);
  }

  presentPatientDetail(patient, type) {
    this.props.app.disclose({
      preferredType: type,
      panelBehavior: 'squish',
      content: {
        key: `DETAIL_${this.props.physicianId}_${patient.id}`,
        name: PatientDetailKey,
        props: {
          physicianId: this.props.physicianId,
          patientId: patient.id,
        },
      },
    });
  }

  render() {
    const { app, physicianId, patientListData, ...customProps } = this.props;

    if (!this.state.patientListData) {
      return null; // <Placeholder app={app} headerText="Patient List" loadingText="Loading patients..." />;
    }

    return (
      <PatientList
        {...customProps}
        app={app}
        patients={{ patients: this.state.patientListData }}
        isLoading={this.state.isLoading}
        onRefresh={this.refresh}
        onSelectPatientDetail={this.presentPatientDetail}
      />
    );
  }
}

PatientListController.propTypes = {
  app: AppDelegate.propType,
  physicianId: PropTypes.string,
  patientListData: PropTypes.object,
};

export default PatientListController;

const appDelegateKey = 'PatientListController';
AppDelegate.registerComponent(appDelegateKey, PatientListController);
export { appDelegateKey };

const reducers = Object.assign({}, { patientListController }, patientDetailReducers);
export { reducers };
