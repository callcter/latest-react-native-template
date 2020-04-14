import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabIcon from '../components/common/TabIcon'

import News from '../containers/news'
import User from '../containers/user'

const Tab = createBottomTabNavigator()

export default function HomeTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabIcon name={route.name} focused={focused} />
        ),
      })}
    >
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  )
}
