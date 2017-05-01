import React, { PropTypes } from 'react';
import { Consumer } from 'xfc';

import NavigationHeader from '../../navigation/core/navigation-header/NavigationHeader';
import ContentContainer from '../../generic-components/content-container/ContentContainer';
import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';

import './EmbeddedContentConsumer.scss';

class EmbeddedContentConsumer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentSupportsNavigation: true,
    };

    this.providerMounted = this.providerMounted.bind(this);

    this.providerDisclose = this.providerDisclose.bind(this);
    this.providerDismiss = this.providerDismiss.bind(this);
    this.providerCloseDisclosure = this.providerCloseDisclosure.bind(this);
    this.providerMaximize = this.providerMaximize.bind(this);
  }

  componentDidMount() {
    if (this.embeddedContentWrapper) {
      this.xfcFrame = Consumer.mount(this.embeddedContentWrapper, this.props.src);

      this.xfcFrame.on('providerApplication.mounted', this.providerMounted);

      this.xfcFrame.on('providerApplication.disclose', this.providerDisclose);
      this.xfcFrame.on('providerApplication.dismiss', this.providerDismiss);
      this.xfcFrame.on('providerApplication.closeDisclosure', this.providerCloseDisclosure);
      this.xfcFrame.on('providerApplication.maximize', this.providerMaximize);

      // Set a timeout to switch the navigation support state flag to false. We don't want to set this immediately,
      // but if the consumer does not provide navigation support data in 5 seconds, we'll display our header to
      // ensure the user can close the disclosure.
      this.fallbackHeaderTimeout = setTimeout(() => {
        this.setState({ contentSupportsNavigation: false });
      }, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.fallbackHeaderTimeout);

    if (this.xfcFrame) {
      this.xfcFrame.removeAllListeners('providerApplication.mounted');
      this.xfcFrame.removeAllListeners('providerApplication.disclose');
      this.xfcFrame.removeAllListeners('providerApplication.dismiss');
      this.xfcFrame.removeAllListeners('providerApplication.maximize');
    }
  }

  providerMounted(data) {
    // Since the provider responded, we clear the timeout and use the value given in the payload to determine support.
    clearTimeout(this.fallbackHeaderTimeout);

    this.setState({ contentSupportsNavigation: data.navigationSupported });

    this.xfcFrame.trigger('consumerApplication.bootstrap', {
      navigator: {
        disclose: true,
        dismiss: this.props.app.dismiss !== undefined,
        closeDisclosure: this.props.app.closeDisclosure !== undefined,
        maximize: this.props.app.maximize !== undefined,
        canGoBack: this.props.app.canGoBack,
      },
    });
  }

  providerDisclose(data) {
    this.props.app.disclose(data.options);
  }

  providerDismiss(data) {
    this.props.app.dismiss(data.options);
  }

  providerCloseDisclosure(data) {
    this.props.app.closeDisclosure(data.options);
  }

  providerMaximize(data) {
    this.props.app.maximize(data.options);
  }

  render() {
    const { app } = this.props;

    return (
      <ContentContainer
        header={!this.state.contentSupportsNavigation && <NavigationHeader app={app} hasBottomBorder />}
        fill
      >
        <div
          className="terra-EmbeddedContentConsumer"
          ref={(element) => { this.embeddedContentWrapper = element; }}
        />
      </ContentContainer>
    );
  }
}

EmbeddedContentConsumer.propTypes = {
  src: PropTypes.string,
  app: AppDelegate.propType,
};

export default EmbeddedContentConsumer;
