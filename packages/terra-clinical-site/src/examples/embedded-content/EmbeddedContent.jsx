import React from 'react';

import ErrorView from 'terra-clinical-error-view';
import EmbeddedContent from 'terra-clinical-embedded-content';

const view2 = () => (
  <ErrorView
    name="test name"
    description="test description"
    buttonText="test button"
    isGlyphHidden={false}
  />);

const view = () => (
  <EmbeddedContent
    src="http://localhost:9292/provider/schedule/orion_list?date=2016-08-12"
    src="https://www.w3schools.com"
  />);

export default view;