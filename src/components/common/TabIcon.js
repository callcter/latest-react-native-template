import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
  img: {
    width: 20 * rem,
    height: 20 * rem,
  },
  dot: {
    position: 'absolute',
    backgroundColor: Color.red,
    width: 6 * rem,
    height: 6 * rem,
    borderRadius: 3 * rem,
    right: -6 * rem,
    top: -3 * rem,
  },
})

const IconNewsNormal = require('../../../assets/images/ic_bottab_news_normal.png')
const IconNewsSelected = require('../../../assets/images/ic_bottab_news_selected.png')
const IconUserNormal = require('../../../assets/images/ic_bottab_user_normal.png')
const IconUserSelected = require('../../../assets/images/ic_bottab_user_selected.png')

export default (props) => {
  const { focused, name } = props
  let source = IconNewsNormal
  switch (name) {
    case '新闻':
      source = focused ? IconNewsSelected : IconNewsNormal
      break
    case '我的':
      source = focused ? IconUserSelected : IconUserNormal
      break
    default:
      break
  }
  return (
    <View style={{ position: 'relative' }}>
      <Image style={Styles.img} source={source} resizeMode="stretch" />
    </View>
  )
}