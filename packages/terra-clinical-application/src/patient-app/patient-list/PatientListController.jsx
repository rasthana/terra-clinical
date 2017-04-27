import React, { PropTypes } from 'react';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

import Placeholder from '../../generic-components/placeholder/Placeholder';

import PatientList from './PatientList';
import PatientLoader from '../data/PatientLoader';

import PatientDetailController from '../patient-detail/PatientDetailController';

import disclosable from '../hoc/disclosable';

let patientListId = 0;

class PatientListController extends React.Component {
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
    this.presentPatientDetail = this.presentPatientDetail.bind(this);
    this.presentNestedPatientList = this.presentNestedPatientList.bind(this);

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
      }
    })
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
        name: PatientDetailController.disclosureKey,
        props: {
          physicianId: this.props.physicianId,
          patientId: patient.id,
        },
      }
    })
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
      return <Placeholder app={app} headerText="Patient List" loadingText="Loading patients..." />;
    } else {
      return (
        <PatientList
          {...customProps}
          app={app}
          patients={{ patients: this.state.patientListData}}
          isLoading={this.state.isLoading}
          onRefresh={this.refresh}
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

export default disclosable()(PatientListController);
