import React from 'react';
import { View, Text } from 'react-native';

export default class BootScreen extends React.PureComponent {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Boot</Text>
      </View>
    );
  }
}
