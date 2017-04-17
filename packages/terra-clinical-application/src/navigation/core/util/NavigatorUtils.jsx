import React from 'react';
import EmbeddedContentConsumer from '../embedded-content-consumer/EmbeddedContentConsumer';

const componentFromDiscloseOptions = (options) => {
  if (options.content) {
    return options.content;
  } else if (options.fallbackUrl) {
    return <EmbeddedContentConsumer src={options.fallbackUrl} key={options.fallbackUrl} />;
  }

  return undefined;
};

export { componentFromDiscloseOptions };
