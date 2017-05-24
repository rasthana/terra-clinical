'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectSaga = exports.injectReducer = exports.getStore = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

var reducers = {};
var createReducer = function createReducer() {
  return (0, _redux.combineReducers)(_extends({}, reducers));
};

var sagas = {};

var store = void 0;
var sagaMiddleware = void 0;
var getStore = function getStore() {
  if (!store) {
    sagaMiddleware = (0, _reduxSaga2.default)();

    store = (0, _redux.createStore)(createReducer(), composeEnhancers((0, _redux.applyMiddleware)(sagaMiddleware)));

    Object.keys(sagas).forEach(function (key) {
      sagas[key].forEach(function (s) {
        sagaMiddleware.run(s);
      });
    });
  }
  return store;
};

var injectReducer = function injectReducer(name, reducer) {
  if (reducers[name] !== reducer) {
    reducers[name] = reducer;

    if (store) {
      store.replaceReducer(createReducer(store.reducers));
    }
  }
};

var injectSaga = function injectSaga(name, saga) {
  sagas[name] = saga;

  if (sagaMiddleware) {
    saga.forEach(function (s) {
      sagaMiddleware.run(s);
    });
  }
};

exports.getStore = getStore;
exports.injectReducer = injectReducer;
exports.injectSaga = injectSaga;