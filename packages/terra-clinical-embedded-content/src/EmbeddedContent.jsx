import React from 'react';
import PropTypes from 'prop-types';
import { Consumer, Provider } from 'xfc';

// import NavigationHeader from 'navigation/core/navigation-header/NavigationHeader';
// import ContentContainer from 'generic-components/content-container/ContentContainer';
// import AppDelegate from 'navigation/core/app-delegate/AppDelegate';

import './EmbeddedContent.scss';

const propTypes = {
  /**
   * The source URL of the content to load.
   **/
  src: PropTypes.string.isRequired,
  /**
   * 
   **/
  secret: PropTypes.string,
  /**
   * Enables the scroll bar within the embedded content when set to true.
   **/
  scrolling: PropTypes.bool,
  /**
   * The container will resize on width instead of height when set to true.
   **/
  autoResizeWidth: PropTypes.bool,
  /**
   * If specified (e.g. '200px', '50%'), the height will stay at the specified value.
   * NOTE: setting this attribute will turn off autoresizing.
   **/
  fixedHeight: PropTypes.string,
  /**
   * If specified (e.g. '400px', '100%'), the widght will stay at the specified value.
   * NOTE: setting this attribute will turn off autoresizing.
   **/
  fixedWidth: PropTypes.string,
  heightCalculationMethod: PropTypes.oneOf(['bodyOffset', 'bodyScroll', 'documentElementOffset', 'documentElementScroll', 'max', 'min']),
  widthCalculationMethod: PropTypes.oneOf(['bodyOffset', 'bodyScroll', 'documentElementOffset', 'documentElementScroll', 'scroll', 'max', 'min']),
  customCalculationMethod: PropTypes.func,
  /**
   * An object containing event handlers keyed by the event name. 
   * (e.g. {'eventA': function() {}, 'eventB': function() {}})
   **/
  eventHandlers: PropTypes.object,
}

const defaultProps = {
  scrolling: false,
  autoResizeWidth: false,
  fixedHeight: "",
  fixedWidth: "",
  heightCalculationMethod: "bodyOffset",
  widthCalculationMethod: "scroll",
  eventHandlers: {}
}

class EmbeddedContent extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     contentSupportsNavigation: true,
  //   };

  //   this.bootstrapFrame = this.bootstrapFrame.bind(this);
  //   this.providerMounted = this.providerMounted.bind(this);

  //   this.providerDisclose = this.providerDisclose.bind(this);
  //   this.providerDismiss = this.providerDismiss.bind(this);
  //   this.providerCloseDisclosure = this.providerCloseDisclosure.bind(this);
  //   this.providerMaximize = this.providerMaximize.bind(this);
  // }

  componentDidMount() {
    if (this.embeddedContentWrapper) {
      Consumer.init();
      this.xfcFrame = Consumer.mount(this.embeddedContentWrapper, this.props.src, { 
      secret: this.props.secret,
      resizeConfig: {
        scrolling: this.props.scrolling,
        autoResizeWidth: this.props.autoResizeWidth,
        fixedHeight: this.props.fixedHeight,
        fixedWidth: this.props.fixedWidth,
        heightCalculationMethod: this.props.heightCalculationMethod,
        widthCalculationMethod: this.props.widthCalculationMethod,
        customCalculationMethod: this.props.customCalculationMethod
      } });

      Object.keys(this.props.eventHandlers).forEach(event => {
        this.xfcFrame.on(event, this.props.eventHandlers[event]);
      });
      // this.xfcFrame.on('providerApplication.mounted', this.providerMounted);
      // this.xfcFrame.on('providerApplication.disclose', this.providerDisclose);
      // this.xfcFrame.on('providerApplication.dismiss', this.providerDismiss);
      // this.xfcFrame.on('providerApplication.closeDisclosure', this.providerCloseDisclosure);
      // this.xfcFrame.on('providerApplication.maximize', this.providerMaximize);

      // // Set a timeout to switch the navigation support state flag to false. We don't want to set this immediately,
      // // but if the consumer does not provide navigation support data in 5 seconds, we'll display our header to
      // // ensure the user can close the disclosure.
      // this.fallbackHeaderTimeout = setTimeout(() => {
      //   this.setState({ contentSupportsNavigation: false });
      // }, 5000);
    }
  }

  // showAlert() {
  //   alert("Show the Chart!");
  // }

  // componentDidUpdate() {
  //   // This might be too heavy to do every update. We might want to compare app delegates and only bootstrap
  //   // when changes ocurred.
  //   this.bootstrapFrame();
  // }

  // componentWillUnmount() {
  //   clearTimeout(this.fallbackHeaderTimeout);

  //   if (this.xfcFrame) {
  //     this.xfcFrame.removeAllListeners('providerApplication.mounted');
  //     this.xfcFrame.removeAllListeners('providerApplication.disclose');
  //     this.xfcFrame.removeAllListeners('providerApplication.dismiss');
  //     this.xfcFrame.removeAllListeners('providerApplication.maximize');
  //   }
  // }

  // bootstrapFrame() {
  //   this.xfcFrame.trigger('consumerApplication.bootstrap', {
  //     navigator: {
  //       disclose: true,
  //       dismiss: this.props.app.dismiss !== undefined,
  //       closeDisclosure: this.props.app.closeDisclosure !== undefined,
  //       maximize: this.props.app.maximize !== undefined,
  //       canGoBack: this.props.app.canGoBack,
  //       isMaximized: this.props.app.isMaximized,
  //     },
  //   });
  // }

  // providerMounted(data) {
  //   // Since the provider responded, we clear the timeout and use the value given in the payload to determine support.
  //   clearTimeout(this.fallbackHeaderTimeout);

  //   this.setState({ contentSupportsNavigation: data.navigationSupported });

  //   this.bootstrapFrame();
  // }

  // providerDisclose(data) {
  //   this.props.app.disclose(data.options);
  // }

  // providerDismiss(data) {
  //   this.props.app.dismiss(data.options);
  // }

  // providerCloseDisclosure(data) {
  //   this.props.app.closeDisclosure(data.options);
  // }

  // providerMaximize(data) {
  //   this.props.app.maximize(data.options);
  // }

  render() {
    const { app } = this.props;  
      return (
        <div
          className="terra-EmbeddedContent"
          ref={(element) => { this.embeddedContentWrapper = element; }}
        />);
        
      // <ContentContainer
      //   header={!this.state.contentSupportsNavigation && <NavigationHeader app={app} hasBottomBorder />}
      //   fill
      // >
      //   <div
      //     className="terra-EmbeddedContent"
      //     ref={(element) => { this.embeddedContentWrapper = element; }}
      //   />
      // </ContentContainer>
    // );    
  }
}

EmbeddedContent.propTypes = propTypes;
EmbeddedContent.defaultProps = defaultProps;

export default EmbeddedContent;

// const appDelegateKey = 'EmbeddedContent';
// AppDelegate.registerComponent(appDelegateKey, EmbeddedContent);
// export { appDelegateKey };