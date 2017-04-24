import React, { PropTypes } from 'react';
import Button from 'terra-button';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

import ContentContainer from '../../generic-components/content-container/ContentContainer';

import PatientStore from '../patient-list/data/PatientStore';

import PatientUpdate from './PatientUpdate';

class PatientUpdateLoader extends React.Component {
  constructor(props) {
    super(props);

    this.defaultPlaceholderComponent = this.defaultPlaceholderComponent.bind(this);
    this.getData = this.getData.bind(this);

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
      this.setState({ patientUpdateData: PatientStore.getPatient('physician1', this.props.url), isLoading: false });
    }, 3000);
  }

  defaultPlaceholderComponent() {
    return (
      <ContentContainer
        header={(
          <NavigationHeader title="Patient Update Placeholder" app={this.props.app} />
        )}
        fill
      >
        <h2>Loading...</h2>
      </ContentContainer>
    )
  }

  render() {
    const patient = this.state.patientUpdateData;

    if (!patient) {
      return this.defaultPlaceholderComponent();
    }

    return (
      <PatientUpdate
        app={this.props.app}
        patient={patient}
        isLoading={this.state.isLoading}
        onSubmit={this.props.onSubmit}
        onCancel={this.props.onCancel}
      />
    );
  }
}

PatientUpdateLoader.propTypes = {
  app: AppDelegate.propType,
  url: PropTypes.string,
  patientUpdateData: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PatientUpdateLoader;
