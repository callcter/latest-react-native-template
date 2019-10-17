/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  View, FlatList, Image, Text, StyleSheet,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TabView } from 'react-native-tab-view'
import Wrapper from '../../components/common/wrapper'
import Header from '../../components/header'
import TabIcon from '../../components/common/TabIcon'
import DataSource from './dataSource'
import { IconBox } from '../../components/iconfont'
import TabBar from '../../components/tabview'

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
    flex: 1,
    height: 100,
    position: 'relative',
  },
  title: {
    fontSize: 16 * rem,
    fontWeight: '500',
  },
  content: {
    fontSize: 13 * rem,
    color: Colors.f_assist,
    marginTop: 5,
  },
  icon_list_container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  icon_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  icon_text: {
    fontSize: 12 * rem,
    color: Colors.f_assist,
    marginLeft: 2,
  },
})

export default class NewsIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { title: '推荐', key: 'recommend' },
        { title: '热门', key: 'hot' },
      ],
    }
  }

  _renderItem = ({ item }) => (
    <View style={styles.container}>
      <Image source={{ uri: item.thumb }} style={styles.image} resizeMode="cover" />
      <View style={styles.content_container}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.content}>{item.content}</Text>
        <View style={styles.icon_list_container}>
          <View style={styles.icon_container}>
            <IconBox name="read" size={16} />
            <Text style={styles.icon_text}>{item.read_count}</Text>
          </View>
          <View style={styles.icon_container}>
            <IconBox name="like" size={16} />
            <Text style={styles.icon_text}>{item.like_count}</Text>
          </View>
          <View style={styles.icon_container}>
            <IconBox name="comment" size={16} />
            <Text style={styles.icon_text}>{item.comment_count}</Text>
          </View>
        </View>
      </View>
    </View>
  )

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'recommend':
        return (
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
        )
      case 'hot':
        return (
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
        )
      default:
        return null
    }
  }

  _handleIndexChange = (index) => {
    this.setState({ index: index })
  }

  static navigationOptions = {
    title: '新闻',
    tabBarIcon: ({ focused }) => <TabIcon name="新闻" focused={focused} />,
  }

  render() {
    return (
      <Wrapper>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={(props) => (<TabBar {...props} />)}
          onIndexChange={this._handleIndexChange}
          initialLayout={{ width: Adapter.width, height: 0 }}
        />

      </Wrapper>
    );
  }
}
