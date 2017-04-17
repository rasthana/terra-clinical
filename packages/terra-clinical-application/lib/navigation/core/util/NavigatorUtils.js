'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentFromDiscloseOptions = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EmbeddedContentConsumer = require('../embedded-content-consumer/EmbeddedContentConsumer');

var _EmbeddedContentConsumer2 = _interopRequireDefault(_EmbeddedContentConsumer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentFromDiscloseOptions = function componentFromDiscloseOptions(options) {
  if (options.content) {
    return options.content;
  } else if (options.fallbackUrl) {
    return _react2.default.createElement(_EmbeddedContentConsumer2.default, { src: options.fallbackUrl, key: options.fallbackUrl });
  }

  return undefined;
};

exports.componentFromDiscloseOptions = componentFromDiscloseOptions;