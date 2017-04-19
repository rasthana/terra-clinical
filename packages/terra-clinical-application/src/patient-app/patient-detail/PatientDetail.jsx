import React, { PropTypes } from 'react';
import Button from 'terra-button';
import DetailView from 'terra-clinical-detail-view';
import IconRefresh from 'terra-icon/lib/icon/IconRefresh';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

import ContentContainer from '../../generic-components/content-container/ContentContainer';
import ActivityIndicator from '../../generic-components/activity-indicator/ActivityIndicator';

import PatientUpdate from '../patient-update/PatientUpdate';
import PatientStore from '../patient-list/data/PatientStore';

class PatientDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      patient: undefined,
    };

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.refresh();

    this.unsubscribeFromStore = PatientStore.subscribe(() => this.refresh());
  }

  componentWillUnmount() {
    this.unsubscribeFromStore();
    clearTimeout(this.refreshTimeout);
  }

  refresh() {
    const newState = Object.assign({}, this.state);

    newState.isLoading = true;

    this.setState(newState);

    this.refreshTimeout = setTimeout(() => {
      const newDataState = Object.assign({}, this.state);

      newDataState.isLoading = false;
      newDataState.patient = PatientStore.getPatient(this.props.physicianId, this.props.patientId);

      this.setState(newDataState);
    }, 0);
  }

  render() {
    const patient = this.state.patient;

    let loadingIndicator;
    if (this.state.isLoading) {
      loadingIndicator = <ActivityIndicator />;
    }

    let detailContent;
    if (patient) {
      detailContent = (
        <DetailView
          title={patient.name}
          subtitles={[patient.status]}
          graph={<img style={{ width: '200px' }} alt="patient-img" src={patient.photo} />}
          details={[
            <div key="UPDATE_BUTTONS">
              <Button
                text="Update (Panel)"
                onClick={() => (
                  this.props.app.disclose({
                    content: (
                      <PatientUpdate
                        key={`PATIENT_UPDATE:${this.props.physicianId}:${this.props.patientId}`}
                        physicianId={this.props.physicianId}
                        patientId={this.props.patientId}
                      />
                    ),
                    preferredType: 'panel' })
                )}
              />
              <Button
                text="Update (Modal)"
                onClick={() => (
                  this.props.app.disclose({
                    content: (
                      <PatientUpdate
                        key={`PATIENT_UPDATE:${this.props.physicianId}:${this.props.patientId}`}
                        physicianId={this.props.physicianId}
                        patientId={this.props.patientId}
                      />
                    ),
                    preferredType: 'modal' })
                )}
              />
              <Button
                text="Update (Main)"
                onClick={() => (
                  this.props.app.disclose({
                    content: (
                      <PatientUpdate
                        key={`PATIENT_UPDATE:${this.props.physicianId}:${this.props.patientId}`}
                        physicianId={this.props.physicianId}
                        patientId={this.props.patientId}
                      />
                    ),
                    preferredType: 'main' })
                )}
              />
            </div>,
          ]}
          footer={patient.comment}
          isDivided
        />
      );
    }

    return (
      <ContentContainer
        id="orion-PatientDetail"
        header={(
          <NavigationHeader title="Patient Detail" app={this.props.app}>
            <Button onClick={this.refresh} icon={<IconRefresh isSpin={this.state.isLoading} />} />
          </NavigationHeader>
        )}
        fill
      >
        {loadingIndicator}
        {detailContent}
      </ContentContainer>
    );
  }
}

PatientDetail.propTypes = {
  app: AppDelegate.propType,
  physicianId: PropTypes.string,
  patientId: PropTypes.string,
};

export default PatientDetail;
