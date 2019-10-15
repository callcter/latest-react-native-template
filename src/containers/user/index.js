import React from 'react'
import { View } from 'react-native'
import Wrapper from '../../components/common/wrapper'
import Header from '../../components/header'
import TabIcon from '../../components/common/TabIcon'

export default class UserIndex extends React.Component {
  static navigationOptions = {
    title: '我的',
    tabBarIcon: ({ focused }) => <TabIcon name="我的" focused={focused} />,
  }

  render() {
    return (
      <Wrapper>
        <Header
          title="我的"
          titleAlign="center"
          leftElement={<View></View>}
          hasBottomLine
        />
      </Wrapper>
    );
  }
}
