import React from 'react'
import {
  AppState, Linking,
} from 'react-native'
import { Provider } from 'react-redux'
import { MenuProvider } from 'react-native-popup-menu'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import store from './src/reducers'
import Toast from './src/components/toast'
import LinkRoutes from './src/routes/linkRoutes'
import AppNavigator from './src/routes/AppNavigator'

export default class Root extends React.Component {
  async componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      Linking.getInitialURL().then((res) => {
        if (!!res) {
          LinkRoutes(res.split(':/')[1])
        }
      })
    } else {
      _log(nextAppState)
    }
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <MenuProvider>
            <AppNavigator />
          </MenuProvider>
        </SafeAreaProvider>
        <Toast
          ref={(ref) => { this.toast = ref }}
          position="center"
          fadeInDuration={250}
          fadeOutDuration={500}
          opacity={0.85}
          style={{ zIndex: 10000 }}
        />
      </Provider>
    )
  }
}
