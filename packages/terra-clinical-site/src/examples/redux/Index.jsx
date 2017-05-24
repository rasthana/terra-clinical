/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-clinical-redux/docs/README.md';
import { version } from 'terra-clinical-redux/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import ReduxSrc from '!raw-loader!terra-clinical-redux/src/Redux';

// Example Files

const ReduxExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props" src={ReduxSrc} />
  </div>
);

export default ReduxExamples;
