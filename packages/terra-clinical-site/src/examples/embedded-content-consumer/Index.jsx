import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-clinical-embedded-content-consumer/docs/README.md';
import { version } from 'terra-clinical-embedded-content-consumer/package.json';

// Component Source
/* eslint-disable import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions */
import EmbeddedContentConsumerSrc from '!raw-loader!terra-clinical-embedded-content-consumer/src/EmbeddedContentConsumer.jsx';
/* eslint-disable import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions */

// Example files
import BasicConsumer from './consumers/BasicConsumer';
import CustomEventConsumer from './consumers/CustomEventConsumer';
import CustomEventsConsumer from './consumers/CustomEventsConsumer';
import OnReadyConsumer from './consumers/OnReadyConsumer';
import ResizeConsumer from './consumers/resizeConsumer';

const EmbeddedContentConsumerExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <h2>Embedded Content Consumer</h2>
    <PropsTable id="embedded_content_consumer_props" src={EmbeddedContentConsumerSrc} />
    <h2 id="Basic Content">Basic Embedded Content</h2>
    <BasicConsumer />
    <h2 id="Custom Event Content">Custom Event Embedded Content</h2>
    <CustomEventConsumer />
    <h2 id="Custom Events Content">Custom Event Embedded Content</h2>
    <CustomEventsConsumer />
    <h2 id="On Ready Content">On Ready Embedded Content</h2>
    <OnReadyConsumer />
    <h2 id="Resize Content">Resize Embedded Content</h2>
    <ResizeConsumer />
  </div>
);

export default EmbeddedContentConsumerExamples;
