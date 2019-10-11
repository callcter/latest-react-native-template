import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

//竖线
export default VerticalLine = (props) => {
  
  const {
    height = null,
    color = Color.l_high,
    width = StyleSheet.hairlineWidth,
    style = null
  } = props

  const lineStyle = [{
    width: width,
    backgroundColor: color,
    height: height ? height : 'auto'
  }, style]
  
  if(!height) lineStyle.push({flex: 1})

  return <View style={lineStyle} />
}

VerticalLine.propTypes = {
  height: PropTypes.number,
  color: PropTypes.oneOfType([PropTypes.string,PropTypes.object]),
  width: PropTypes.number
}
