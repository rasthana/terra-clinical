import React, { PropTypes } from 'react';
import { Provider } from 'xfc';

import AppDelegate from '../../navigation/core/app-delegate/AppDelegate';

const bootstrappedAppDelegate = data => (
  AppDelegate.create({
    disclose: (options) => {
      Provider.trigger('providerApplication.disclose', { options });
    },
    dismiss: data.navigator.dismiss ? (options) => {
      Provider.trigger('providerApplication.dismiss', { options });
    } : null,
    closeDisclosure: data.navigator.closeDisclosure ? (options) => {
      Provider.trigger('providerApplication.closeDisclosure', { options });
    } : null,
    maximize: data.navigator.maximize ? (options) => {
      Provider.trigger('providerApplication.maximize', { options });
    } : null,
    canGoBack: data.navigator.canGoBack,
  })
);

class EmbeddedContentProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isProviderReady: false,
      appDelegate: undefined,
    };
  }

  componentDidMount() {
    Provider.init({
      acls: this.props.acls,
      secret: this.props.secret,
      onReady: () => {
        this.setState({ isProviderReady: true });

        Provider.on('consumerApplication.bootstrap', (data) => {
          this.setState({
            appDelegate: bootstrappedAppDelegate(data),
          });
        });

        Provider.trigger('providerApplication.mounted', { navigationSupported: true });
      },
    });
  }

  render() {
    if (!this.state.isProviderReady) {
      return null;
    }

    return React.cloneElement(this.props.content, { app: this.state.appDelegate });
  }
}

EmbeddedContentProvider.propTypes = {
  content: PropTypes.node,
  acls: PropTypes.array,
  secret: PropTypes.func,
};

EmbeddedContentProvider.defaultProps = {
  acls: ['*'],
  secret: () => (Promise.resolve('Success')),
};

export default EmbeddedContentProvider;
