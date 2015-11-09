import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { devTools } from 'redux-devtools';
import { createHashHistory as createHistory } from 'history';
import createLogger from 'redux-logger';
import routes from '../routes';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import reduxPersistImmutable from 'redux-persist-immutable';
import rootReducer from '../reducers';

let router;
if (window.location.hostname.indexOf('github.io')) {
  router = reduxReactRouter({
    routes,
    createHistory,
    basename: window.location.pathname.replace(/\/$/, '')
  });
} else {
  router = reduxReactRouter({ routes, createHistory });
}

// TODO: rethink about logger
const finalCreateStore = compose(
  applyMiddleware(thunk),
  router,
  devTools(),
  applyMiddleware(createLogger())
)(createStore);

const store = autoRehydrate()(finalCreateStore)(rootReducer);

// Enable store persistence
persistStore(store, {
  whitelist: ['lastSuccessfulLogin'],
  transforms: [reduxPersistImmutable]
});

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
