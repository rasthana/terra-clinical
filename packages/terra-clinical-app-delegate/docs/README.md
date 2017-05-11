# Terra Clinical App Delegate

The AppDelegate is a object that provides a set of functions used to facilitate communcation between Containers and
their containing Applications. The AppDelegate enforces an API, but the implementations of those APIs are defined
entirely by the consumer constructing it.

## Getting Started

- Install with [npmjs](https://www.npmjs.com):
  - `npm install terra-clinical-app-delegate`

## Usage

```js
import AppDelegate from 'terra-clinical-app-delegate';

const newAppDelegateInstance = AppDelegate.create({
  disclose: (data) => {
    // Perform disclose action (open modal, inline panel, etc.)
  },
  dismiss: (data) => {
    // Dismiss current Container
  },
  closeDisclosure: (data) => {
    // Close entire disclosure method, regardless of other content
  },
  goBack: (data) => {
    // Dismiss current Container
  },
  maximize: (data) => {
    // Maximize the disclosure method
  },
  minimize: (data) => {
    // Minimize the disclosure method
  }
});

const clonedAppDelegateInstance = AppDelegate.clone(newAppDelegateInstance, {
  disclose: (data) => {
    // Override disclose function from newAppDelegateInstance
  },
});

```
