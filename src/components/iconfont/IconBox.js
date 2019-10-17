import React from 'react';
import Iconfont from './iconfont';

// 规范字体图标的size、宽高、行高，方便对齐

export default (props) => {
  const {
    name, size, color, iconStyle, style,
  } = props
  const iconStyleTemp = [{
    width: size,
    height: size,
    lineHeight: size,
  }, iconStyle, style];
  return (
    <Iconfont name={name} size={size} style={iconStyleTemp} color={color} selectable={false} />
  )
}