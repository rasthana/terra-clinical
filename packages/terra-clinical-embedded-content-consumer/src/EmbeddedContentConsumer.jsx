import React from 'react';
import PropTypes from 'prop-types';
import { Consumer } from 'xfc';
import './EmbeddedContentConsumer.scss';

const propTypes = {
  /**
   * The source URL of the content to load.
   */
  src: PropTypes.string.isRequired,
  /**
   * The component can be configured with an authorization secret and resize options.
   * secret - The authorization secret to be used if the embedded app does not know which domain to trust.
   */
  options: PropTypes.shape({
    /**
     * The authorization secret to be used if the embedded app does not know which domain to trust.
     */
    secret: PropTypes.string,
    /**
     * Specifies the resize configuration.
     */
    resizeConfig: PropTypes.shape({
      /**
       * When set to be true, scrollbar may show up on component.
       */
      scrolling: PropTypes.boolean,
      /**
       * When set to be true, the component autoresizes on width instead of on height.
       */
      autoResizeWidth: PropTypes.boolean,
      /**
       * If specified (e.g. '200px'), the height will stay at the specified value.
       * NOTE: setting this attribute will turn off autoresizing.
       */
      fixedHeight: PropTypes.string,
      /**
       * If specified (e.g. '400px'), the width of the component will stay at the specified value.
       * NOTE: setting this attribute will turn off autoresizing.
       */
      fixedWidth: PropTypes.string,
      /**
       * Height calculation method preference. Defaults to 'bodyOffset'.
       */
      heightCalculationMethod: PropTypes.oneOf([
        'bodyOffset',             // use document.body.offsetHeight
        'bodyScroll',             // use document.body.scrollHeight
        'documentElementOffset',  // use document.documentElement.offsetHeight
        'documentElementScroll',  // use document.documentElement.scrollHeight
        'max',                    // max of all of above options.
        'min',                    // min of all of above options.
      ]),
      /**
       * Width calculation method preference. Default to 'scroll'.
       */
      widthCalculationMethod: PropTypes.oneOf([
        'bodyOffset',             // use document.body.offsetHeight
        'bodyScroll',             // use document.body.scrollHeight
        'documentElementOffset',  // use document.documentElement.offsetHeight
        'documentElementScroll',  // use document.documentElement.scrollHeight
        'scroll',                 // max of bodyScroll and documentElementScroll.
        'max',                    // max of all of above options.
        'min',                    // min of all of above options.
      ]),
      /**
       * When specified, the component size will be updated when necessary.
       */
      customCalculationMethod: PropTypes.func,
    }),
  }),
  /**
   * A list of event handlers keyed by the event name.
   */
  eventHandlers: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    handler: PropTypes.func,
  })),
};

const defaultProps = {
  src: undefined,
  options: undefined,
  eventHandlers: undefined,
};

class EmbeddedContentConsumer extends React.Component {

  componentDidMount() {
    Consumer.init();
    this.xfcFrame = Consumer.mount(this.embeddedContentWrapper, this.props.src, this.props.options);

    if (this.props.eventHandlers) {
      this.props.eventHandlers.forEach((event) => {
        this.xfcFrame.on(event.key, event.handler);
      });
    }
  }

  render() {
    return (
      <div
        className="terraClinical-EmbeddedContentConsumer"
        ref={(element) => { this.embeddedContentWrapper = element; }}
      />
    );
  }
}

EmbeddedContentConsumer.propTypes = propTypes;
EmbeddedContentConsumer.defaultProps = defaultProps;

export default EmbeddedContentConsumer;
