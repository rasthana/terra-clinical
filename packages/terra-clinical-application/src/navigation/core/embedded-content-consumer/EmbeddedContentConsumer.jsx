import React, { PropTypes } from 'react';
import { Consumer } from 'xfc';

import NavigationHeader from '../../core/navigation-header/NavigationHeader';
import ContentContainer from '../../../generic-components/content-container/ContentContainer';
import AppDelegate from '../app-delegate/AppDelegate';

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
    this.providerGoBack = this.providerGoBack.bind(this);
    this.providerMaximize = this.providerMaximize.bind(this);
  }

  componentDidMount() {
    if (this.embeddedContentWrapper) {
      this.xfcFrame = Consumer.mount(this.embeddedContentWrapper, this.props.src);

      this.xfcFrame.on('providerApplication.mounted', this.providerMounted);

      this.xfcFrame.on('providerApplication.disclose', this.providerDisclose);
      this.xfcFrame.on('providerApplication.dismiss', this.providerDismiss);
      this.xfcFrame.on('providerApplication.closeDisclosure', this.providerCloseDisclosure);
      this.xfcFrame.on('providerApplication.goBack', this.providerGoBack);
      this.xfcFrame.on('providerApplication.maximize', this.providerMaximize);
    }
  }

  componentWillUnmount() {
    if (this.xfcFrame) {
      this.xfcFrame.removeAllListeners('providerApplication.mounted');
      this.xfcFrame.removeAllListeners('providerApplication.disclose');
      this.xfcFrame.removeAllListeners('providerApplication.dismiss');
      this.xfcFrame.removeAllListeners('providerApplication.closeDisclosure');
      this.xfcFrame.removeAllListeners('providerApplication.goBack');
      this.xfcFrame.removeAllListeners('providerApplication.maximize');
    }
  }

  providerMounted(data) {
    this.setState({ contentSupportsNavigation: data.navigationSupported });

    this.xfcFrame.trigger('consumerApplication.bootstrap', {
      navigator: {
        disclose: true,
        dismiss: true,
        closeDisclosure: this.props.app.closeDisclosure !== undefined,
        goBack: this.props.app.goBack !== undefined,
        maximize: this.props.app.maximize !== undefined,
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

  providerGoBack(data) {
    this.props.app.goBack(data.options);
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
