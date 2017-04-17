import React, { PropTypes } from 'react';
import Button from 'terra-button';
import List from 'terra-list';
import ClinicalItemView from 'terra-clinical-item-view';
import IconRefresh from 'terra-icon/lib/icon/IconRefresh';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

import ActivityIndicator from '../../generic-components/activity-indicator/ActivityIndicator';
import ContentContainer from '../../generic-components/content-container/ContentContainer';

import PatientDetail from '../patient-detail/PatientDetail';
import PatientStore from './data/PatientStore';

let patientListId = 0;

class PatientList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: patientListId += 1,
      isLoading: true,
      patientList: undefined,
    };

    this.refresh = this.refresh.bind(this);
    this.showPatientDetail = this.showPatientDetail.bind(this);
    this.showIn = this.showIn.bind(this);
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
      newDataState.patientList = PatientStore.getPatientList(this.props.physicianId);

      this.setState(newDataState);
    }, 5000 * Math.random());
  }

  showPatientDetail(patient, type) {
    return () => {
      const patientDetailComponent = (
        <PatientDetail
          key={`PATIENT_DETAIL:${patient.id}`}
          physicianId={this.props.physicianId}
          patientId={patient.id}
        />
      );

      this.props.app.disclose({ content: patientDetailComponent, preferredType: type });
    };
  }

  showIn(type) {
    return () => {
      // const modalPatientList = (
      //   <PatientList
      //     key={`PATIENT_LIST:${this.state.id + 1}`}
      //     physicianId={this.props.physicianId}
      //   />
      // );

      this.props.app.disclose({
        // content: modalPatientList,
        fallbackUrl: `${window.location.origin}/?type=${type}`,
        preferredType: type,
        size: 'large',
        panelBehavior: 'overlay' });
    };
  }

  render() {
    let loadingIndicator;
    if (this.state.isLoading) {
      loadingIndicator = <ActivityIndicator />;
    }

    const patientListItems = [];
    if (this.state.patientList && this.state.patientList.length) {
      this.state.patientList.forEach((patient) => {
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
            <Button key="Refresh" onClick={this.refresh} icon={<IconRefresh isSpin={this.state.isLoading} />} />
            <Button key="Modal" onClick={this.showIn('modal')} text="Launch Modal" />
            <Button key="Panel" onClick={this.showIn('panel')} text="Launch Panel" />
            <Button key="Main" onClick={this.showIn('main')} text="Launch Main" />
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
  physicianId: PropTypes.string,
  app: PropTypes.instanceOf(AppDelegate),
};

export default PatientList;
