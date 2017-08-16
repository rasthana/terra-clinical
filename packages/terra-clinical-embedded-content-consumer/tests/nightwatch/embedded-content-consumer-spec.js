/* eslint-disable no-unused-expressions */

// eslint-disable-next-line import/no-extraneous-dependencies
const screenshot = require('terra-toolkit').screenshot;

module.exports = {
  before: (browser, done) => {
    browser.resizeWindow(browser.globals.width, browser.globals.height, done);
  },

  afterEach: (browser, done) => {
    screenshot(browser, 'terra-clinical-embedded-content-consumer', done);
  },

  'Displays a provider embedded in the consumer that contains title text.': (browser) => {
    const consumerSrc = '#/tests/embedded-content-consumer-tests/basic-consumer';
    const providerSrc = '#/tests/embedded-content-consumer-tests/basic-provider';

    browser.url(`http://localhost:${browser.globals.webpackDevServerPort}/${consumerSrc}`)
    // Wait for the consumer to load the provider.
    .waitForElementPresent(`iframe[src*="${providerSrc}"]`, 1000)
    // Identify the embedded iframe.
    .element('css selector', `iframe[src*="${providerSrc}"]`, (frame) => {
      browser.frame({ ELEMENT: frame.value.ELEMENT }, () => {
        // Validate the provider has been accurately loaded.
        browser.expect.element('h1').text.to.equal('Basic content');
      });
    // Reset the frame back to the parent frame.
    }).frame(null);
  },

  'Displays a provider embedded in the consumer expanded to fill the parent.': (browser) => {
    const consumerSrc = '#/tests/embedded-content-consumer-tests/fill-consumer';
    const providerSrc = '#/tests/embedded-content-consumer-tests/basic-provider';

    browser.url(`http://localhost:${browser.globals.webpackDevServerPort}/${consumerSrc}`)
    // Wait for the consumer to load the provider.
    .waitForElementPresent(`iframe[src*="${providerSrc}"]`, 1000)
    .getElementSize('div[class="xfc"]', (parentContainer) => {
      browser.getElementSize(`iframe[src*="${providerSrc}"]`, (frame) => {
        const borderWidth = 2;
        // Validate the provider expanded to fill the parent.
        browser.assert.equal(frame.value.height, parentContainer.value.height - borderWidth);
        browser.assert.equal(frame.value.width, parentContainer.value.width);
      });
    });
  },

  'Displays a provider embedded in the consumer that triggers after initialization is complete.': (browser) => {
    const consumerSrc = '#/tests/embedded-content-consumer-tests/on-ready-consumer';
    const providerSrc = '#/tests/embedded-content-consumer-tests/on-ready-provider';

    browser.url(`http://localhost:${browser.globals.webpackDevServerPort}/${consumerSrc}`)
    // Wait for the consumer to load the provider application.
    .waitForElementPresent(`iframe[src*="${providerSrc}"]`, 1000)
    // Identify the embedded iframe.
    .element('css selector', `iframe[src*="${providerSrc}"]`, (frame) => {
      browser.frame({ ELEMENT: frame.value.ELEMENT }, () => {
        // Validate the provider has been accurately loaded.
        browser.expect.element('h1').text.to.equal('On Ready Events');
        // Validate the provider after onReady is invoked.
        browser.expect.element('p#ready').text.to.equal('onReady function being executed after the consumer has been authorized.');
      });
    // Reset the frame back to the parent frame.
    }).frame(null);
  },

  'Displays a provider embedded in the consumer that triggers a custom event.': (browser) => {
    const consumerSrc = '#/tests/embedded-content-consumer-tests/custom-event-consumer';
    const providerSrc = '#/tests/embedded-content-consumer-tests/custom-event-provider';

    browser.url(`http://localhost:${browser.globals.webpackDevServerPort}/${consumerSrc}`)
    // Wait for the consumer to load the provider application.
    .waitForElementPresent(`iframe[src*="${providerSrc}"]`, 1000)
    // Validate the provider before the custom event handler is invoked.
    .expect.element('div#CustomEvent').to.have.css('border').which.equals('0px none rgb(28, 31, 33)');
    // Pause the test briefly till the custom handler is invoked.
    browser.pause(1000);
    // Validate the provider after the custom event handler is invoked.
    browser.expect.element('div#CustomEvent').to.have.css('border').which.equals('5px dashed rgb(0, 0, 255)');
  },

  'Displays a provider embedded in the consumer that triggers multiple custom event.': (browser) => {
    const consumerSrc = '#/tests/embedded-content-consumer-tests/custom-events-consumer';
    const providerSrc = '#/tests/embedded-content-consumer-tests/custom-events-provider';

    browser.url(`http://localhost:${browser.globals.webpackDevServerPort}/${consumerSrc}`)
    // Wait for the consumer to load the provider application.
    .waitForElementPresent(`iframe[src*="${providerSrc}"]`, 1000)
    // Validate the provider before the custom event handler is invoked.
    .expect.element('div#CustomEvents').to.have.css('border').which.equals('0px none rgb(28, 31, 33)');
    // Pause the test briefly till the custom handler is invoked.
    browser.pause(1000)
    // Validate the provider after the custom event handler is invoked.
    .expect.element('div#CustomEvents').to.have.css('border').which.equals('5px dashed rgb(0, 0, 255)');
    // Pause the test briefly till the second custom handler is invoked.
    browser.pause(1000)
    // Validate the provider after the second custom event handler is invoked.
    .expect.element('div#CustomEvents').to.have.css('border').which.equals('5px dashed rgb(0, 255, 0)');
  },

  'Displays the consumer life cycle status.': (browser) => {
    const consumerSrc = '#/tests/embedded-content-consumer-tests/data-status-consumer';
    const providerSrc = '#/tests/embedded-content-consumer-tests/data-status-provider';

    browser.url(`http://localhost:${browser.globals.webpackDevServerPort}/${consumerSrc}`)
    // Wait for the consumer to load the provider application.
    .waitForElementPresent(`iframe[src*="${providerSrc}"]`, 1000)
    // Identify the embedded iframe.
    .element('css selector', `iframe[src*="${providerSrc}"]`, (frame) => {
      browser.frame({ ELEMENT: frame.value.ELEMENT }, () => {
        // Validate the lifecycle has completed.
        browser.assert.elementPresent('li#Mounted');
        browser.assert.elementPresent('li#Launched');
        browser.assert.elementPresent('li#Authorized');
      });
    // Reset the frame back to the parent frame.
    }).frame(null);
  },

  'Displays another provider application in full screen.': (browser) => {
    const consumerSrc = '#/tests/embedded-content-consumer-tests/full-screen-consumer';
    const providerSrc = '#/tests/embedded-content-consumer-tests/full-screen-provider';

    browser.url(`http://localhost:${browser.globals.webpackDevServerPort}/${consumerSrc}`)
    // Wait for the consumer to load the provider application.
    .waitForElementPresent(`iframe[src*="${providerSrc}"]`, 1000)
    .assert.elementPresent('div#FullScreenWrapper')
    .element('css selector', `iframe[src*="${providerSrc}"]`, (frame) => {
      browser.frame({ ELEMENT: frame.value.ELEMENT }, () => {
        // Click the full screen button to invoke the full screen event.
        browser.click('button[type=fullscreen]');
      });
      // Reset the frame back to the parent frame.
    }).frame(null);
    // Validate that the button click inkoved the full screen handler.
    browser.expect.element('div#FullScreenWrapper').to.have.css('border').which.equals('5px dashed rgb(0, 0, 255)');
  },
};
