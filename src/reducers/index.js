import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
import { createNavigationReducer, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import AppNavigator from '../routes/AppNavigator';

import alert from './alert'
import modal from './modal'
import news from './news'
import user from './user'
import auth from './auth'

const reducers = combineReducers({
  nav: createNavigationReducer(AppNavigator),
  alert,
  modal,
  news,
  user,
  auth,
});

const navMiddleware = createReactNavigationReduxMiddleware((state) => state.nav);
const middlewares = [navMiddleware, thunk];

if (__DEV__) {
  const logger = createLogger();
  middlewares.push(logger);
}

export default createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares),
  ),
);
