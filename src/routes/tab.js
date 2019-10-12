import { createBottomTabNavigator } from 'react-navigation-tabs';

import News from '../containers/news';
import User from '../containers/user';

export default createBottomTabNavigator({
  News: {
    screen: News,
  },
  User: {
    screen: User,
  },
});
