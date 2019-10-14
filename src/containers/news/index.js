import React from 'react';
import { View } from 'react-native';
import Wrapper from '../../components/common/wrapper'
import Header from '../../components/header'
import TabIcon from '../../components/common/TabIcon'

export default class NewsIndex extends React.Component {
  static navigationOptions = {
    title: '新闻',
    tabBarIcon: ({ focused }) => <TabIcon name="新闻" focused={focused} />,
  }

  render() {
    return (
      <Wrapper>
        <Header
          title="新闻"
          titleAlign="center"
          leftElement={<View></View>}
          hasBottomLine
        />
      </Wrapper>
    );
  }
}
