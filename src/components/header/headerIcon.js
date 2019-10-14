import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types'

import { AnimatedIcon } from '../iconfont'

const ICON_AREA_SIZE = Adapter.height_h

const Styles = StyleSheet.create({
  headerIconArea: {
    width: ICON_AREA_SIZE,
    height: ICON_AREA_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const HeaderIcon = (props) => {
  const {
    name,
    onPress,
    onLongPress,
    color = Color.f_title,
    style,
    size = Adapter.header_icon_size,
  } = props

  const iconStyle = {
    color: color,
    width: size,
    height: size,
    lineHeight: size,
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[Styles.headerIconArea, style]}
    >
      <AnimatedIcon name={name} size={size} style={iconStyle} />
    </TouchableOpacity>
  )
}

HeaderIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

HeaderIcon.defaultProps = {
  onPress: null,
}

export default HeaderIcon
