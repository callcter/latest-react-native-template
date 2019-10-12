import { createStackNavigator } from 'react-navigation-stack';

import Tab from './tab';

export default createStackNavigator({
  Tab: {
    screen: Tab,
    navigationOptions: {
      header: null,
    },
  },
}, {
  headerMode: 'none',
});
