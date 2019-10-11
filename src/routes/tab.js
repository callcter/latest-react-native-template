import { createBottomTabNavigator } from 'react-navigation-tabs'

import News from '../containers/news'
import User from '../containers/user'

export default Tab = createBottomTabNavigator({
  News: {
    screen: News
  },
  User: {
    screen: User
  }
})