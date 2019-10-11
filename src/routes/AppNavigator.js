import { createSwitchNavigator } from 'react-navigation'

import LoadingScreen from '../containers/loadingScreen'
import BootScreen from '../containers/bootScreen'
import AppStack from './AppStack'
import AuthStack from './AuthStack'

export default createSwitchNavigator({
  Loading: {
    screen: LoadingScreen
  },
  Boot: {
    screen: BootScreen
  },
  App: {
    screen: AppStack
  },
  Auth: {
    screen: AuthStack
  } 
}, {
  initialRouteName: 'Loading',
  resetOnBlur: true
})
