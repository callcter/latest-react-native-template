import React from 'react'
import { 
  View, 
  Animated, 
  Text, 
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as AlertActionCreators from '../../actions/alert'
import TouchableWrapper from '../common/TouchableWrapper'
import VerticalLine from '../common/VerticalLine'

class PopAlert extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showAlert: false,
      animValue: new Animated.Value(0)
    }
  }
  
  static propTypes = {
    show: PropTypes.bool,
    animDuration: PropTypes.number,
    zIndex: PropTypes.number,
    onPressMask: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string,
    contentComponent: PropTypes.object,
    btns: PropTypes.array
  }
  
  static defaultProps = {
    show: false,
    animDuration: 300,
    zIndex: 1080,
    onPressMask: null, //点击遮罩区域触发函数
    title: '请确定', //Alert标题
    content: '', //Alert内容
    contentComponent: null, //Alert自定义内容
    btns: [ //Alert按钮数组
      {
        text: '取消',
        color: Color.f_assist, //字色
        width: '50%', //宽度，如果不赋值，则flex:1自适应
        leftSpace: 0,
        rightSpace: 0,
        hasSeparator: true, //如果hasSeparator,则按钮右侧显示分割竖线
        onPress: ()=>null
      },
      {
        text: '确定',
        color: Color.theme,
        leftSpace: 0,
        rightSpace: 0,
        hasSeparator: false,
        onPress: ()=>null
      }
    ]
  }
  
  componentDidMount() {
    if(this.props.show) this.showAlert()
  }
  
  componentWillReceiveProps(nextProps) {
    if(this.props.show != nextProps.show) {
      if(nextProps.show) {
        this.showAlert()
      } else {
        this.hideAlert()
      }
    }
  }
  
  showAlert = () => {
    this.setState({showAlert: true})
    Animated.timing(this.state.animValue, {
      toValue: 1,
      duration: this.props.animDuration,
      useNativeDriver: true
    }).start()
  }
  
  hideAlert = () => {
    Animated.timing(this.state.animValue, {
      toValue: 0,
      duration: this.props.animDuration,
      useNativeDriver: true
    }).start(event => {
      if (event.finished) {
        this.setState({showAlert: false})
        this.props.alertReset()
      }
    })
  }
  
  renderBtn = (item, index) => {
    const btnStyle = [Styles.btn]
    if(item.width) {
      btnStyle.push({width: item.width})
    } else {
      btnStyle.push({flex: 1})
    }
    if(item.leftSpace) {
      btnStyle.push({marginLeft: item.leftSpace})
    }
    if(item.rightSpace) {
      btnStyle.push({marginRight: item.rightSpace})
    }
    
    const btnTextStyle = [Styles.btnText, {
      color: item.color
    }]
    
    return (
      <TouchableWrapper 
        key={index} 
        style={btnStyle} 
        onPress={item.onPress}>
        <Text style={btnTextStyle}>{item.text}</Text>
        {
          item.hasSeparator ? <VerticalLine height={30*rem} /> : null
        }
      </TouchableWrapper>
    )
  }
  
  
  render() {
    
    MaskView = this.props.onPressMask ? TouchableOpacity : View
    
    alertBoxStyle = [Styles.alertBox, {
      opacity: this.state.animValue,
      transform: [
        {
          scale : this.state.animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1]
          })
        }
      ]
    }]
    
    if(this.state.showAlert) {
      return (
        <Animated.View style={[Styles.container, {opacity: this.state.animValue, zIndex: this.props.zIndex}]}>
          <Animated.View style={alertBoxStyle}>
            {
              this.props.title && this.props.title.length > 0 ?
              <Text style={Styles.title}>{this.props.title}</Text> : <View style={{height: 0, width: '100%', marginTop: 24*rem}} />
            }
            {
              this.props.content && this.props.content.length > 0 ?
              <Text style={Styles.content}>{this.props.content}</Text> : null
            }
            { this.props.contentComponent }
            <View style={Styles.bottom}>
              {
                _.map(this.props.btns, (item, index)=>this.renderBtn(item, index))
              }
            </View>
          </Animated.View>
          <MaskView style={Styles.mask} onPress={this.props.onPressMask} />
        </Animated.View>
      )
    } else {
      return null
    }
  }
}

const Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    top: 0,
    width: '100%',
    bottom: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mask: {
    width: '100%',
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  alertBox: {
    position: 'relative',
    zIndex: 2,
    width: '80%',
    height: 'auto',
    borderRadius: 4*rem,
    backgroundColor: Color.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  title: {
    fontSize: 18*rem,
    lineHeight: 26*rem,
    color: Color.f_title,
    marginTop: 24*rem,
    paddingHorizontal: 16*rem
  },
  content: {
    marginTop: 10*rem,
    fontSize: 15*rem,
    lineHeight: 22*rem,
    paddingHorizontal: 16*rem,
    color: Color.f_title
  },
  bottom: {
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Color.l_high,
    marginTop: 24*rem,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%', 
    flexDirection: 'row'
  },
  btnText: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 16*rem,
    fontSize: 15*rem,
    lineHeight: 22*rem
  }
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...AlertActionCreators }, dispatch)
}

export default connect(null, mapDispatchToProps)(PopAlert)

