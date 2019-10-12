import React from 'react'
import { TouchableOpacity } from 'react-native'

// 通用点击容器，方便实现统一的点击背景变色效果等
export default class TouchableWrapper extends React.Component {
  static defaultProps = {
    disabled: false,
    pressInColor: Color.b_main,
    pressOutColor: 'transparent',
  };

  constructor(props) {
    super(props);
    this.state = {
      btnState: 'out', // 'in' 'out'
    };
  }

  onPressIn = () => {
    if (this.props.disabled) {
      return;
    }
    if (this.state.btnState === 'out') {
      this.setState({ btnState: 'in' });
    }
  };

  onPressOut = () => {
    if (this.props.disabled) {
      return;
    }
    if (this.state.btnState === 'in') {
      this.setState({ btnState: 'out' });
    }
  };

  render() {
    const {
      style,
      disabled,
      onPress,
      onLongPress,
      pressInColor,
      pressOutColor,
      activeOpacity = 1,
    } = this.props;

    return (
      <TouchableOpacity
        style={[style, { backgroundColor: this.state.btnState === 'in' ? pressInColor : pressOutColor }]}
        onPress={onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        disabled={disabled}
        onLongPress={onLongPress}
        activeOpacity={activeOpacity}
      >
        {this.props.children}
      </TouchableOpacity>
    );
  }
}
