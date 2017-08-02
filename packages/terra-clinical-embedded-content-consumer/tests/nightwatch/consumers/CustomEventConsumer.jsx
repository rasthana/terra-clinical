import React from 'react';
import EmbeddedContentConsumer from '../../../lib/EmbeddedContentConsumer';

const eventHandlers = [{
  key: 'invokeCustomEvent',
  handler: () => {
    document.getElementById('CustomEvent').style.border = 'thick dashed #0000FF';
  },
}];

const CustomEventConsumer = () => (
  <div id="CustomEvent">
    <EmbeddedContentConsumer
      src="#/tests/embedded-content-consumer-tests/custom-event-provider"
      eventHandlers={eventHandlers}
    />
  </div>
);

export default CustomEventConsumer;
