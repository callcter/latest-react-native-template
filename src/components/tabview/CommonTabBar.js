import React from 'react'
import {
  findNodeHandle, UIManager, View, StyleSheet,
} from 'react-native'
import { TabBar } from 'react-native-tab-view'

const styles = StyleSheet.create({
  tabbar: {
    height: Adapter.height_t,
    backgroundColor: Color.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

export default class Bar extends React.Component {
  constructor(props) {
    super(props)
    this.width = Adapter.width
    this.tabbar = React.createRef()
  }

  _onLayout = (event) => {
    const { layout } = event.nativeEvent
    this.width = layout.width
  }

  layout = (ref) => {
    const handle = findNodeHandle(ref)
    return new Promise((resolve) => {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        resolve({
          x, y, width, height, pageX, pageY,
        })
      })
    })
  }

  render() {
    const {
      scrollEnabled = false,
      hasBottomLine = false,
      indicatorWidth = 20 * rem,
      indicatorStyle,
      padHorizontal = 0,
      activeColor = Color.f_title,
      inactiveColor = Color.f_assist,
      padLeft,
      padRight,
      labelStyle,
      tabStyle,
    } = this.props
    const padLeftVal = !!padLeft ? padLeft : padHorizontal
    const padRightVal = !!padRight ? padRight : padHorizontal
    const { width } = this
    const count = this.props.navigationState.routes.length
    const { index } = this.props.navigationState
    const pad = padLeftVal + padRightVal
    const tabWidth = !!tabStyle && tabStyle.width
    let left = 0
    if (!!tabWidth) {
      left = (tabWidth / 2 + padLeftVal - indicatorWidth / 2)
    } else {
      left = (width - pad) / count / 2 + padLeftVal - indicatorWidth / 2 + ((width - pad) / count) * index - (width / count) * index
    }
    return (
      <View onLayout={this._onLayout}>
        <TabBar
          ref={(ref) => { this.tabbar = ref }}
          {...this.props}
          scrollEnabled={scrollEnabled}
          tabStyle={[{ paddingHorizontal: 0, minHeight: 40 * rem }, tabStyle]}
          labelStyle={[{ fontSize: 15 * rem, fontWeight: '400', paddingHorizontal: 0 }, labelStyle]}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          pressOpacity={0.5}
          style={[
            styles.tabbar,
            {
              borderBottomColor: hasBottomLine ? Color.line : 'transparent',
              paddingHorizontal: padHorizontal,
              paddingLeft: padLeft,
              paddingRight: padRight,
            },
            this.props.style,
          ]}
          indicatorStyle={[{
            backgroundColor: Color.theme, bottom: 3 * rem, width: indicatorWidth, left: left,
          }, indicatorStyle]}
        />
      </View>
    )
  }
}
