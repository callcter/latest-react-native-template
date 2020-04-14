import React from 'react'
import {
  View, ViewPropTypes, StatusBar, StyleSheet,
} from 'react-native'
// import { NavigationEvents } from 'react-navigation'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Color.white,
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
  },
})

export default class Wrapper extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
  }

  static defaultProps = {
    style: {},
  }

  onPageFocus = () => {
    if (!Adapter.isIOS) {
      // 修复安卓一定概率状态栏沉浸式效果失效
      StatusBar.setTranslucent(true)
    }
  }

  render() {
    return (
      <View style={[styles.wrapper, this.props.style]}>
        {/* <NavigationEvents onWillFocus={this.onPageFocus} /> */}
        {this.props.children}
      </View>
    )
  }
}