import { createStackNavigator } from 'react-navigation-stack'

import Tab from './tab'

export default AppStack = createStackNavigator({
  Tab: {
    screen: Tab,
    navigationOptions: {
      header: null
    }
  }
}, {
  headerMode: 'none'
})