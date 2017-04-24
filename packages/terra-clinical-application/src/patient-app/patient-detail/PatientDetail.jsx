import React, { PropTypes } from 'react';
import Button from 'terra-button';
import ButtonGroup from 'terra-button-group';
import DetailView from 'terra-clinical-detail-view';
import IconRefresh from 'terra-icon/lib/icon/IconRefresh';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

import ContentContainer from '../../generic-components/content-container/ContentContainer';
import ActivityIndicator from '../../generic-components/activity-indicator/ActivityIndicator';

class PatientDetail extends React.Component {
  constructor(props) {
    super(props);

    this.showPatientUpdate = this.showPatientUpdate.bind(this);
  }

  showPatientUpdate(patient, type) {
    return () => {
      if (this.props.onSelectPatientUpdate) {
        this.props.onSelectPatientUpdate(this.props.app, patient, type);
      }
    };
  }

  render() {
    const patient = this.props.patient;

    let loadingIndicator;
    if (this.props.isLoading) {
      loadingIndicator = <ActivityIndicator />;
    }

    let detailContent;
    if (patient) {
      detailContent = (
        <DetailView
          title={patient.name}
          subtitles={[patient.status]}
          graph={<img style={{ width: '280px' }} alt="patient-img" src={patient.photo} />}
          details={[
            <div key="UPDATE_BUTTONS">
              <ButtonGroup size="small">
                <ButtonGroup.Button
                  key="PANEL"
                  text="Update (Panel)"
                  onClick={this.showPatientUpdate(patient, 'panel')}
                />
                <ButtonGroup.Button
                  key="MODAL"
                  text="Update (Modal)"
                  onClick={this.showPatientUpdate(patient, 'modal')}
                />
                <ButtonGroup.Button
                  key="MAIN"
                  text="Update (Main)"
                  onClick={this.showPatientUpdate(patient, 'main')}
                />
              </ButtonGroup>
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
            {this.props.onRefresh && <Button onClick={this.props.onRefresh} icon={<IconRefresh isSpin={this.props.isLoading} />} />}
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
  patient: PropTypes.object,
  isLoading: PropTypes.bool,
  onRefresh: PropTypes.func,
  onSelectPatientUpdate: PropTypes.func,
};

export default PatientDetail;
