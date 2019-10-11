import React, { Component } from 'react'

import Iconfont from './index'

//规范字体图标的size、宽高、行高，方便对齐
export default class IconBox extends Component {
  render() {
    const iconStyle=[{
      width: this.props.size,
      height: this.props.size,
      lineHeight: this.props.size
    }, this.props.iconStyle, this.props.style]
    
    return <Iconfont name={this.props.name} size={this.props.size} style={iconStyle} color={this.props.color} selectable={false} />
  }
}
