import { createStackNavigator } from 'react-navigation-stack';

import AuthLogin from '../containers/auth/login';

export default createStackNavigator({
  AuthLogin: {
    screen: AuthLogin,
  },
}, {
  headerMode: 'none',
});
