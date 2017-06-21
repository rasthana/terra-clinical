/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from 'terra-props-table';
import Markdown from 'terra-markdown';
import ReadMe from 'terra-clinical-error-view/docs/README.md';
import { version } from 'terra-clinical-embedded-content/package.json';

// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import EmbeddedContentSrc from '!raw-loader!terra-clinical-embedded-content/src/EmbeddedContent.jsx';

// Example Files
import EmbeddedContent from './EmbeddedContent';

const EmbeddedContentExamples = () => (
  <div>
    <div id="version">Version: {version}</div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props-embeddedContent" src={EmbeddedContentSrc} />
    <h2 id="embeddedContent">Embedded Content</h2>
    <EmbeddedContent />
  </div>
);

export default EmbeddedContentExamples;