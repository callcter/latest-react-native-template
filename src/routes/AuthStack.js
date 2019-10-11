import { createStackNavigator } from 'react-navigation-stack'

import AuthLogin from '../containers/auth/login'

export default AuthStack = createStackNavigator({
  AuthLogin: {
    screen: AuthLogin
  }
}, {
  headerMode: 'none'
})