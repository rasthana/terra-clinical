import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = {};
const createReducer = () => (
  combineReducers({
    ...reducers,
  })
);

const sagas = {};

let store;
let sagaMiddleware;
const getStore = () => {
  if (!store) {
    sagaMiddleware = createSagaMiddleware();

    store = createStore(
      createReducer(),
      composeEnhancers(applyMiddleware(sagaMiddleware)),
    );

    Object.keys(sagas).forEach((key) => {
      sagas[key].forEach((s) => { sagaMiddleware.run(s); });
    });
  }
  return store;
};

const injectReducer = (name, reducer) => {
  if (reducers[name] !== reducer) {
    reducers[name] = reducer;

    if (store) {
      store.replaceReducer(createReducer(store.reducers));
    }
  }
};

const injectSaga = (name, saga) => {
  sagas[name] = saga;

  if (sagaMiddleware) {
    saga.forEach((s) => { sagaMiddleware.run(s); });
  }
};

export { getStore, injectReducer, injectSaga };
