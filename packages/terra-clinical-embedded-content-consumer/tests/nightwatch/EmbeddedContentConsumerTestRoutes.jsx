/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import EmbeddedContentConsumerTests from './EmbeddedContentConsumerTests';

// Content consumer components.
import BasicConsumer from './consumers/BasicConsumer';
import CustomEventConsumer from './consumers/CustomEventConsumer';
import CustomEventsConsumer from './consumers/CustomEventsConsumer';
import OnReadyConsumer from './consumers/OnReadyConsumer';
import ResizeConsumer from './consumers/ResizeConsumer';

// Content provider components.
import BasicProvider from './providers/BasicProvider';
import CustomEventProvider from './providers/CustomEventProvider';
import CustomEventsProvider from './providers/CustomEventsProvider';
import OnReadyProvider from './providers/OnReadyProvider';
import ResizeProvider from './providers/ResizeProvider';

const routes = (
  <div>
    <Route path="/tests/embedded-content-consumer-tests" component={EmbeddedContentConsumerTests} />
    <Route path="/tests/embedded-content-consumer-tests/basic-consumer" component={BasicConsumer} />
    <Route path="/tests/embedded-content-consumer-tests/basic-provider" component={BasicProvider} />
    <Route path="/tests/embedded-content-consumer-tests/on-ready-consumer" component={OnReadyConsumer} />
    <Route path="/tests/embedded-content-consumer-tests/on-ready-provider" component={OnReadyProvider} />
    <Route path="/tests/embedded-content-consumer-tests/custom-event-consumer" component={CustomEventConsumer} />
    <Route path="/tests/embedded-content-consumer-tests/custom-event-provider" component={CustomEventProvider} />
    <Route path="/tests/embedded-content-consumer-tests/custom-events-consumer" component={CustomEventsConsumer} />
    <Route path="/tests/embedded-content-consumer-tests/custom-events-provider" component={CustomEventsProvider} />
    <Route path="/tests/embedded-content-consumer-tests/resize-consumer" component={ResizeConsumer} />
    <Route path="/tests/embedded-content-consumer-tests/resize-provider" component={ResizeProvider} />
  </div>
);

export default routes;
