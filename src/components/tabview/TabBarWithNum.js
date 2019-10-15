import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import TabBar from './CommonTabBar'

const numHeight = 20 * rem

const styles = StyleSheet.create({
  labelStyle: {
    margin: 0,
    fontSize: Adapter.fs_tab,
    color: Color.f_assist,
  },
  activeLabelStyle: {
    margin: 0,
    fontSize: Adapter.fs_tab,
    color: Color.f_title,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  numContainer: {
    position: 'absolute',
    paddingHorizontal: 8 * rem,
    height: numHeight,
    top: '50%',
    marginTop: -0.5 * numHeight,
    left: '100%',
    marginLeft: 4 * rem,
    borderRadius: 0.5 * numHeight,
    backgroundColor: Color.b_main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: {
    fontSize: 12 * rem,
    color: Color.f_title,
  },
})

const TabBarWithNum = (props) => (
  <TabBar
    {...props}
    renderLabel={({ route, focused }) => {
      const textStyle = focused ? [styles.activeLabelStyle, props.activeLabelStyle] : [styles.labelStyle, props.labelStyle]
      return (
        <View style={styles.labelContainer}>
          <Text style={textStyle}>
            {route.title}
          </Text>
          {
            route.idx != null && props.data[route.idx]
              ? (
                <View style={[styles.numContainer, { opacity: focused ? 1 : 0.5 }]}>
                  <Text style={styles.numText}>{props.data[route.idx]}</Text>
                </View>
              ) : null
          }
        </View>
      );
    }}
  />
)

export default TabBarWithNum
