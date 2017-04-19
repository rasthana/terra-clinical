import React, { PropTypes } from 'react';
import Button from 'terra-button';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

import ContentContainer from '../../generic-components/content-container/ContentContainer';

import PatientStore from '../patient-list/data/PatientStore';

class PatientUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleSubmit() {
    const changeData = {
      name: this.nameTextAreaElement.value,
      status: this.statusTextAreaElement.value,
      comment: this.commentTextAreaElement.value,
    };

    PatientStore.update(this.props.physicianId, this.props.patientId, changeData);

    this.props.app.dismiss();
  }

  handleCancel() {
    this.props.app.dismiss();
  }

  render() {
    const patient = PatientStore.getPatient(this.props.physicianId, this.props.patientId);

    return (
      <ContentContainer
        id="orion-PatientUpdate"
        header={<NavigationHeader title="Patient Update" app={this.props.app} />}
        fill
      >
        <div style={{ margin: '10px' }}>
          <h4>Update</h4>
          <p>Name</p>
          <textarea ref={(element) => { this.nameTextAreaElement = element; }} defaultValue={patient.name} />
          <p>Status</p>
          <textarea ref={(element) => { this.statusTextAreaElement = element; }} defaultValue={patient.status} />
          <p>Comment</p>
          <textarea ref={(element) => { this.commentTextAreaElement = element; }} defaultValue={patient.comment} />
          <div>
            <Button onClick={this.handleCancel} variant="secondary" text="Cancel" />
            <Button onClick={this.handleSubmit} variant="primary" text="Submit" />
          </div>
        </div>
      </ContentContainer>
    );
  }
}

PatientUpdate.propTypes = {
  app: AppDelegate.propType,
  physicianId: PropTypes.string,
  patientId: PropTypes.string,
};

export default PatientUpdate;
