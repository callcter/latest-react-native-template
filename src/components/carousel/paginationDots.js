import React, { Component } from 'react'
import { Pagination } from 'react-native-snap-carousel'
import ColorTool from 'color'

// 轮播翻页点
export default class PaginationDots extends Component {
  static defaultProps = {
    dotSize: 6,
    dotSpace: 10,
    dotColor: Color.white,
    dotColorInactive: ColorTool(Color.white).fade(0.4),
    style: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      activeSlide: 0,
    }
  }

  setPagination(num) {
    this.setState({
      activeSlide: num,
    })
  }

  render() {
    const {
      dotColor, dotSpace, dotColorInactive, dotSize, style,
    } = this.props

    const dotCss = {
      marginBottom: 0,
      marginHorizontal: 0.5 * dotSpace,
      width: dotSize,
      height: dotSize,
      borderRadius: 0.5 * dotSize,
    }

    const dotStyle = [dotCss]
    if (dotColor) dotStyle.push({ backgroundColor: dotColor })

    const dotStyleInactive = [dotCss]
    if (dotColorInactive) dotStyleInactive.push({ backgroundColor: dotColorInactive })

    const containerStyle = [{
      backgroundColor: 'transparent',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 10,
      padding: 0,
      margin: 0,
      height: 'auto',
      paddingVertical: 0,
    }, style]

    return (
      <Pagination
        dotsLength={this.props.carouselData.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={containerStyle}
        dotContainerStyle={{ marginHorizontal: 0 }}
        dotStyle={dotStyle}
        inactiveDotStyle={dotStyleInactive}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    )
  }
}