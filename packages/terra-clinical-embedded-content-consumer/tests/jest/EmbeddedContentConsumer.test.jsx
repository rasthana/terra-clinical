import React from 'react';
import EmbeddedContentConsumer from '../../lib/EmbeddedContentConsumer';

// Snapshot Tests
it('should render the terraClinical-EmbeddedContentConsumer wrapper', () => {
  const embeddedContentConsumer = <EmbeddedContentConsumer src="https://www.google.com/" />;

  const wrapper = shallow(embeddedContentConsumer);
  expect(wrapper).toMatchSnapshot();
});

it('should validate the required inputs', () => {
  const src = 'https://www.google.com/';

  const embeddedContentConsumer = <EmbeddedContentConsumer src={src} />;
  const wrapper = mount(embeddedContentConsumer);

  expect(wrapper.props().src).toBe(src);
});

it('should validate the optional inputs', () => {
  const src = 'https://www.google.com/';
  const options = { secret: 'Validation Secret', resizeConfig: { scrolling: true } };
  const handlers = [{ key: 'eventKey', handler: () => {} }];

  const embeddedContentConsumer = (<EmbeddedContentConsumer
    src={src}
    options={options}
    handlers={handlers}
  />);
  const wrapper = mount(embeddedContentConsumer);

  expect(wrapper.props().src).toBe(src);
  expect(wrapper.props().options).toBe(options);
  expect(wrapper.props().handlers).toBe(handlers);
});
