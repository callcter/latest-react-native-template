import { StyleSheet } from 'react-native'
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
}, {
  animationEnabled: false, // 切换页面时不显示动画
  swipeEnabled: false, // 禁止左右滑动
  backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
  tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
  tabBarOptions: {
    activeTintColor: Color.theme,
    inactiveTintColor: Color.f_assist,
    activeBackgroundColor: Color.white,
    inactiveBackgroundColor: Color.white,
    showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
    indicatorStyle: { height: 0 }, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线
    labelStyle: { // 文字样式
      fontSize: 11 * rem,
      bottom: 4 * rem,
      marginLeft: 0,
    },
    tabStyle: {
      flexDirection: 'column',
    },
    style: { // 整个 Tabbar 样式
      height: Adapter.height_nav,
      borderStyle: 'solid',
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: Color.l_high,
      backgroundColor: Color.white,
    },
  },
})
