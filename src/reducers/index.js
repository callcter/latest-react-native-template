import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import alert from './alert'
import modal from './modal'
import news from './news'
import user from './user'
import auth from './auth'

const reducers = combineReducers({
  alert,
  modal,
  news,
  user,
  auth,
})

const middleware = [thunk];

if (__DEV__) {
  const logger = createLogger();
  middleware.push(logger);
}

export default createStore(
  reducers,
  compose(
    applyMiddleware(...middleware),
  ),
);
