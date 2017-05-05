/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropsTable from '../../../packages/terra-site/src/PropsTable';
import Markdown from '../../../packages/terra-site/src/Markdown';
import ReadMe from '../docs/README.md';
// Component Source
// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import ClinicalNavigationControllerSrc from '!raw-loader!../src/ClinicalNavigationController.jsx';

const ClinicalNavigationControllerExamples = () => (
  <div>
    <Markdown id="readme" src={ReadMe} />
    <PropsTable id="props" src={ClinicalNavigationControllerSrc} />
  </div>
);

export default ClinicalNavigationControllerExamples;
