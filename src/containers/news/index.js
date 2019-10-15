import React from 'react';
import {
  View, FlatList, Image, Text, StyleSheet,
} from 'react-native';
import Wrapper from '../../components/common/wrapper'
import Header from '../../components/header'
import TabIcon from '../../components/common/TabIcon'
import DataSource from './dataSource'
import IconBox from '../../components/iconfont'

const styles = StyleSheet.create({
  container: {
    padding: Adapter.space,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  content_container: {
    paddingLeft: Adapter.space,
  },
  title: {
    fontSize: 16 * rem,
  },
  content: {
    fontSize: 13 * rem,
  },
  icon_list_container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})

export default class NewsIndex extends React.Component {
  _renderItem = (item) => (
    <View style={styles.container}>
      <Image source={item.thumb} style={styles.image} />
      <View style={styles.content_container}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
        <View style={styles.icon_list_container}>
          <View>
            <IconBox name="read" />
            <Text>{item.read_count}</Text>
          </View>
          <View>
            <IconBox name="like" />
            <Text>{item.like_count}</Text>
          </View>
          <View>
            <IconBox name="comment" />
            <Text>{item.comment_count}</Text>
          </View>
        </View>
      </View>
    </View>
  )

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
        <FlatList
          data={DataSource}
          extraData={DataSource}
          keyExtractor={(item, index) => index.toString()}
          enableEmptySections
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          renderItem={this._renderItem}
          onEndReachedThreshold={0.1}
          scrollEventThrottle={1}
        />
      </Wrapper>
    );
  }
}
