import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { createNavigationReducer, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import thunk from 'redux-thunk'
import AppNavigator from '../routes/AppNavigator'

import alert from  './alert.js'
import modal from './modal.js'
import news from './news.js'
import user from './user.js'

const reducers = combineReducers({
  nav: createNavigationReducer(AppNavigator),
  alert: alert,
  modal: modal,
  news: news,
  user: user
})

const navMiddleware = createReactNavigationReduxMiddleware(state => state.nav)
const middlewares = [navMiddleware, thunk]

if(__DEV__){
  let logger = require('redux-logger').createLogger()
  middlewares.push(logger)
}

export default store = createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares)
  )
)