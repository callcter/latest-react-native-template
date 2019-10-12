import React from 'react'
import {
  StyleSheet, View, Animated, Text, ViewPropTypes,
} from 'react-native'

export const DURATION = {
  LENGTH_SHORT: 1000,
  FOREVER: 0,
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: 'center',
    zIndex: 10000,
  },
  content: {
    backgroundColor: 'black',
    borderRadius: 100 * rem,
    paddingHorizontal: 20 * rem,
    paddingVertical: 5 * rem,
    minHeight: 26 * rem,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class Toast extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    position: PropTypes.oneOf(['top', 'center', 'bottom']),
    textStyle: Text.propTypes.style,
    positionValue: PropTypes.number,
    fadeInDuration: PropTypes.number,
    fadeOutDuration: PropTypes.number,
    opacity: PropTypes.number,
  }

  static defaultProps = {
    style: null,
    position: 'bottom',
    textStyle: { color: 'white' },
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1,
  }

  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      text: '',
      opacityValue: new Animated.Value(this.props.opacity),
    }
  }

  componentWillUnmount() {
    if (!!this.timer) clearTimeout(this.timer)
  }

  show(text, duration, callback) {
    this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT
    this.callback = callback
    this.setState({
      isShow: true,
      text: text,
    })
    Animated.timing(
      this.state.opacityValue,
      {
        toValue: this.props.opacity,
        duration: this.props.fadeInDuration,
      },
    ).start(() => {
      this.isShow = true
      if (duration !== DURATION.FOREVER) this.close()
    })
  }

  close(duration) {
    let delay = typeof duration === 'undefined' ? this.duration : duration
    if (delay === DURATION.FOREVER) delay = this.props.defaultCloseDelay || 250
    if (!this.isShow && !this.state.isShow) return;
    if (!!this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      Animated.timing(
        this.state.opacityValue,
        {
          toValue: 0.0,
          duration: this.props.fadeOutDuration,
        },
      ).start(() => {
        this.setState({
          isShow: false,
        })
        this.isShow = false
        if (typeof this.callback === 'function') {
          this.callback()
        }
      })
    }, delay)
  }

  render() {
    const containerStyle = [styles.container]
    switch (this.props.position) {
      case 'top':
        containerStyle.push({ top: this.props.positionValue })
        break
      case 'center':
        containerStyle.push({ top: '50%', marginTop: -13 * rem })
        break
      case 'bottom':
        containerStyle.push({ bottom: this.props.positionValue })
        break
      default:
        break
    }
    const view = this.state.isShow
      ? (
        <View
          style={containerStyle}
          pointerEvents="none"
        >
          <Animated.View
            style={[styles.content, { opacity: this.state.opacityValue }, this.props.style]}
          >
            {
              React.isValidElement(this.state.text)
                ? this.state.text
                : (
                  <Text style={[{ fontSize: 12 * rem }, this.props.textStyle]}>
                    {this.state.text}
                  </Text>
                )
            }
          </Animated.View>
        </View>
      ) : null
    return view
  }
}
