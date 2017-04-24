import React, { PropTypes } from 'react';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';
import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';

import ContentContainer from '../../generic-components/content-container/ContentContainer';

import PatientStore from '../patient-list/data/PatientStore';
import PatientDetail from './PatientDetail';

class PatientDetailLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      patientDetailData: props.patientDetailData,
    };

    this.getData = this.getData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.defaultPlaceholderComponent = this.defaultPlaceholderComponent.bind(this);
  }


  componentDidMount() {
    if (!this.state.patientDetailData) {
      this.getData();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.getDataTimeout);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ patientDetailData: nextProps.patientDetailData });
  }

  getData() {
    this.setState({ isLoading: true });

    // GET DATA WITH URL
    this.getDataTimeout = setTimeout(() => {
      const patientDetailData = { patient: PatientStore.getPatient('physician1', this.props.url) };

      this.setState({ patientDetailData, isLoading: false });
    }, 3000);
  }

  onRefresh() {
    this.getData();
  }

  defaultPlaceholderComponent() {
    return (
      <ContentContainer
        header={(
          <NavigationHeader title="Patient Detail Placeholder" app={this.props.app} />
        )}
        fill
      >
        <h2>Loading...</h2>
      </ContentContainer>
    )
  }

  render() {
    const { app, patientDetailData, url, ...customProps } = this.props;

    if (!this.state.patientDetailData) {
      return this.defaultPlaceholderComponent();
    } else {
      return (
        <PatientDetail
          {...customProps}
          app={app}
          data={this.state.patientDetailData}
          isLoading={this.state.isLoading}
          onRefresh={this.onRefresh}
          onSelectPatientUpdate={this.props.onSelectPatientUpdate}
        />
      )
    }
  }
}

PatientDetailLoader.propTypes = {
  app: AppDelegate.propType,
  patientDetailData: PropTypes.object,
  url: PropTypes.string,
  placeholderComponent: PropTypes.node,
  onSelectPatientUpdate: PropTypes.func,
};

export default PatientDetailLoader;

