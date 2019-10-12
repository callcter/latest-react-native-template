import React from 'react'
import {
  View,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as ModalActionCreators from '../../actions/modal'

const Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  maskColor: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  contentBox: {
    zIndex: 2,
    backgroundColor: Color.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
})

class PopModal extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    show: PropTypes.bool,
    animDuration: PropTypes.number,
    zIndex: PropTypes.number,
    onPressMask: PropTypes.func,
    type: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    space: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.number,
    minHeight: PropTypes.number,
    contentComponent: PropTypes.element,
    contentStyle: PropTypes.object,
    afterHide: PropTypes.func,
    afterShow: PropTypes.func,
    resetAfterHide: PropTypes.bool,
    showAnimType: PropTypes.string,
  }

  static defaultProps = {
    show: false,
    animDuration: 300,
    zIndex: 1070,
    onPressMask: null, // 点击遮罩区域触发函数
    type: 'center', // 'top','right','bottom','left','center','full' 六种类型的弹窗
    width: '80%',
    height: null,
    space: null, // 左/右/上/下弹窗，空白区域的宽度
    maxHeight: null,
    minHeight: null,
    contentComponent: null,
    contentStyle: null,
    afterHide: null,
    afterShow: null,
    resetAfterHide: true,
    showAnimType: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      contentHeight: 0,
      contentWidth: 0,
      showModal: false,
      animValue: new Animated.Value(0),
    }
  }

  componentDidMount() {
    if (this.props.show) this.showModal()
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      if (this.props.show) {
        this.showModal()
      } else {
        this.hideModal()
      }
    }
  }

  showModal = () => {
    _log('showModalllll', this.props.name)
    this.setState({ showModal: true })
    Animated.timing(this.state.animValue, {
      toValue: 1,
      duration: this.props.animDuration,
      useNativeDriver: true,
    }).start((event) => {
      if (event.finished && this.props.afterShow) {
        this.props.afterShow()
      }
    })
  }

  hideModal = () => {
    _log('hideModalllll', this.props.name)
    Animated.timing(this.state.animValue, {
      toValue: 0,
      duration: this.props.animDuration,
      useNativeDriver: true,
    }).start((event) => {
      if (event.finished) {
        this.setState({ showModal: false })
        if (this.props.resetAfterHide) this.props.modalReset()
        if (this.props.afterHide) this.props.afterHide()
      }
    })
  }

  handleLinkLayout = (e) => {
    const { width, height } = e.nativeEvent.layout
    this.setState({
      contentHeight: height,
      contentWidth: width,
    })
  }


  render() {
    const MaskView = this.props.onPressMask ? TouchableOpacity : View
    const contentStyle = [
      Styles.contentBox,
      this.props.contentStyle,
      { opacity: this.state.animValue },
    ]
    let showAnimStyle = null
    switch (this.props.showAnimType) {
      case 'center':
        showAnimStyle = {
          transform: [
            {
              scale: this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        }
        break
      case 'top':
        showAnimStyle = {
          transform: [
            {
              translateY: this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-1 * this.state.contentHeight, 0],
              }),
            },
          ],
        }
        break
      case 'right':
        showAnimStyle = {
          transform: [
            {
              translateX: this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.contentWidth, 0],
              }),
            },
          ],
        }
        break
      case 'bottom':
        showAnimStyle = {
          transform: [
            {
              translateY: this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [this.state.contentHeight, 0],
              }),
            },
          ],
        }
        break
      case 'left':
        showAnimStyle = {
          transform: [
            {
              translateX: this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-1 * this.state.contentWidth, 0],
              }),
            },
          ],
        }
        break
      case 'full':
        showAnimStyle = {
          transform: [
            {
              scale: this.state.animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            },
          ],
        }
        break
      case 'trans':
        showAnimStyle = { opacity: this.state.animValue }
        break
      case 'none':
        showAnimStyle = {}
        break
      default:
        break
    }

    switch (this.props.type) {
      case 'center':
        contentStyle.push({
          position: 'relative',
          borderRadius: 4 * rem,
          width: this.props.width,
          height: this.props.height ? this.props.height : 'auto',
          maxHeight: this.props.maxHeight ? this.props.maxHeight : 'auto',
          minHeight: this.props.minHeight ? this.props.minHeight : 'auto',
          opacity: this.state.animValue,
        })
        if (showAnimStyle) {
          contentStyle.push(showAnimStyle)
        } else {
          contentStyle.push({
            transform: [
              {
                scale: this.state.animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          })
        }
        break
      case 'top':
        contentStyle.push({
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: this.props.space ? this.props.space : 'auto',
          height: this.props.height ? this.props.height : 'auto',
          maxHeight: this.props.maxHeight ? this.props.maxHeight : 'auto',
          minHeight: this.props.minHeight ? this.props.minHeight : 'auto',
        })
        if (showAnimStyle) {
          contentStyle.push(showAnimStyle)
        } else {
          contentStyle.push({
            transform: [
              {
                translateY: this.state.animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-1 * this.state.contentHeight, 0],
                }),
              },
            ],
          })
        }
        break
      case 'right':
        contentStyle.push({
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: this.props.width ? this.props.width : 'auto',
          left: this.props.space ? this.props.space : 'auto',
        })
        if (showAnimStyle) {
          contentStyle.push(showAnimStyle)
        } else {
          contentStyle.push({
            transform: [
              {
                translateX: this.state.animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.contentWidth, 0],
                }),
              },
            ],
          })
        }
        break
      case 'bottom':
        contentStyle.push({
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: this.props.space ? this.props.space : 'auto',
          height: this.props.height ? this.props.height : 'auto',
          maxHeight: this.props.maxHeight ? this.props.maxHeight : 'auto',
          minHeight: this.props.minHeight ? this.props.minHeight : 'auto',
        })
        if (showAnimStyle) {
          contentStyle.push(showAnimStyle)
        } else {
          contentStyle.push({
            transform: [
              {
                translateY: this.state.animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.state.contentHeight, 0],
                }),
              },
            ],
          })
        }
        break
      case 'left':
        contentStyle.push({
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: this.props.width ? this.props.width : 'auto',
          right: this.props.space ? this.props.space : 'auto',
        })
        if (showAnimStyle) {
          contentStyle.push(showAnimStyle)
        } else {
          contentStyle.push({
            transform: [
              {
                translateX: this.state.animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-1 * this.state.contentWidth, 0],
                }),
              },
            ],
          })
        }
        break
      case 'full':
        contentStyle.push({
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          opacity: this.state.animValue,
        })
        if (showAnimStyle) {
          contentStyle.push(showAnimStyle)
        } else {
          contentStyle.push({
            transform: [
              {
                scale: this.state.animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          })
        }
        break
      default:
        break
    }

    const maskStyle = this.props.type === 'full' ? Styles.mask : [Styles.maskColor, { opacity: this.state.animValue }]

    if (this.state.showModal) {
      return (
        <View style={[Styles.container, { zIndex: this.props.zIndex }]}>
          <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative',
          }}
          >
            <Animated.View style={contentStyle} onLayout={this.handleLinkLayout}>
              {this.props.contentComponent}
            </Animated.View>
            <MaskView style={Styles.mask} activeOpacity={1} onPress={this.props.onPressMask}>
              <Animated.View style={maskStyle} />
            </MaskView>
          </View>
          {Adapter.isIOS ? <KeyboardSpacer /> : null}
        </View>
      )
    }
    return null
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...ModalActionCreators }, dispatch)

export default connect(null, mapDispatchToProps)(PopModal)
