import React, { PropTypes } from 'react';
import Button from 'terra-button';
import List from 'terra-list';
import ClinicalItemView from 'terra-clinical-item-view';
import IconRefresh from 'terra-icon/lib/icon/IconRefresh';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

import ActivityIndicator from '../../generic-components/activity-indicator/ActivityIndicator';
import ContentContainer from '../../generic-components/content-container/ContentContainer';

// import PatientDetail from '../patient-detail/PatientDetail';
// import PatientStore from './data/PatientStore';

// import refreshable from '../../hoc/refreshable/refreshable';

let patientListId = 0;

class PatientList extends React.Component {
  constructor(props) {
    super(props);

    this.showPatientDetail = this.showPatientDetail.bind(this);
    this.showPatientList = this.showPatientList.bind(this);

    this.state = {
      id: patientListId += 1,
    };
  }

  showPatientDetail(patient, type) {
    return () => {
      this.props.onSelectPatientDetail(patient, type);
    };
  }

  showPatientList(patient, type) {
    // debugger;
    return () => {
      this.props.onShowPatientList(type);
    };
  }

  render() {
    let loadingIndicator;
    if (this.props.isLoading) {
      loadingIndicator = <ActivityIndicator />;
    }

    const patientList = this.props.data;

    const patientListItems = [];
    if (patientList && patientList.patients && patientList.patients.length) {
      patientList.patients.forEach((patient) => {
        patientListItems.push((
          <List.Item
            key={patient.id}
            content={
              <ClinicalItemView
                className="orion-ClinicalItemView"
                displays={[
                  <ClinicalItemView.Display text={patient.name} />,
                  <ClinicalItemView.Display text={patient.status} />,
                ]}
                comment={
                  <ClinicalItemView.Comment text={patient.comment} />
                }
                endAccessory={
                  <div>
                    <Button onClick={this.showPatientDetail(patient, 'modal')} text="View (Modal)" />
                    <Button onClick={this.showPatientDetail(patient, 'panel')} text="View (Panel)" />
                    <Button onClick={this.showPatientDetail(patient, 'main')} text="View (Main)" />
                  </div>
                }
              />
            }
          />
        ));
      });
    }

    return (
      <ContentContainer
        className="orion-PatientList"
        header={(
          <NavigationHeader title={`Patient List - ${this.state.id}`} app={this.props.app}>
            {this.props.onRefresh && <Button key="Refresh" onClick={this.props.onRefresh} icon={<IconRefresh isSpin={this.props.isLoading} />} />}
            <Button key="Modal" onClick={this.showPatientList('modal')} text="Launch Modal" />
            <Button key="Panel" onClick={this.showPatientList('panel')} text="Launch Panel" />
            <Button key="Main" onClick={this.showPatientList('main')} text="Launch Main" />
          </NavigationHeader>
        )}
        fill
      >
        {loadingIndicator}
        <List isDivided>
          {patientListItems}
        </List>
      </ContentContainer>
    );
  }
}

PatientList.propTypes = {
  // physicianId: PropTypes.string,
  app: AppDelegate.propType,
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  onRefresh: PropTypes.func,
  onSelectPatientDetail: PropTypes.func,
  onShowPatientList: PropTypes.func,
  // onSelectPatientUpdate: PropTypes.function,
};

export default PatientList;
