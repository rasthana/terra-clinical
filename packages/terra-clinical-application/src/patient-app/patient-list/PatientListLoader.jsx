import React, { PropTypes } from 'react';

import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';
import ContentContainer from '../../generic-components/content-container/ContentContainer';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';

import PatientStore from './data/PatientStore';
import PatientList from './PatientList';

let patientListId = 0;

class PatientListLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      patientListData: props.patientListData,
    };

    this.getData = this.getData.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.defaultPlaceholderComponent = this.defaultPlaceholderComponent.bind(this);
  }

  componentDidMount() {
    if (!this.state.patientListData) {
      this.getData();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.getDataTimeout);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ patientListData: nextProps.patientListData });
  }

  getData() {
    this.setState({ isLoading: true });

    // GET DATA WITH URL
    this.getDataTimeout = setTimeout(() => {
      const patientListData = { patients: PatientStore.getPatientList(this.props.url) };

      this.setState({ patientListData, isLoading: false });
    }, 6000);
  }

  onRefresh() {
    this.getData();
  }

  defaultPlaceholderComponent() {
    return (
      <ContentContainer
        header={(
          <NavigationHeader title="Patient List Placeholder" app={this.props.app} />
        )}
        fill
      >
        <h2>Loading...</h2>
      </ContentContainer>
    )
  }

  render() {
    const { app, patientListData, url, ...customProps } = this.props;

    if (!this.state.patientListData) {
      debugger;
      return this.defaultPlaceholderComponent();
    } else {
      return (
        <PatientList
          {...customProps}
          app={app}
          data={this.state.patientListData}
          isLoading={this.state.isLoading}
          onRefresh={this.onRefresh}
          onSelectPatientDetail={() => {console.log('patient detail selected')}}
          onShowPatientList={() => {console.log('show patient list')}}
        />
      )
    }
  }
}

PatientListLoader.propTypes = {
  app: AppDelegate.propType,
  patientListData: PropTypes.object,
  url: PropTypes.string,
  placeholderComponent: PropTypes.node,
};

export default PatientListLoader;
