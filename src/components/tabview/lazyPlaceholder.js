import React from 'react'
import { View, Text } from 'react-native'

export default (props) => {
  const { route } = props
  const style = {
    flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Color.white,
  }
  return (
    <View style={style}>
      <Text>{`Loading ${route.title}...`}</Text>
    </View>
  )
}