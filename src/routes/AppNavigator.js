import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoadingScreen from '../containers/loadingScreen'
import BootScreen from '../containers/bootScreen'
import HomeTab from './HomeTab'
import AuthLogin from '../containers/auth/login'

const Stack = createStackNavigator()

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{
            headerMode: 'none',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Boot"
          component={BootScreen}
          options={{
            headerMode: 'none',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeTab}
          options={{
            headerMode: 'none',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={AuthLogin}
          options={{
            headerMode: 'none',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
