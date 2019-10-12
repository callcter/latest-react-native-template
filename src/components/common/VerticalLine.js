import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

// 竖线
const VerticalLine = (props) => {
  const {
    height, style, color, width,
  } = props;

  const lineStyle = [{
    width,
    backgroundColor: color,
    height: height || 'auto',
  }, style];

  if (!height) lineStyle.push({ flex: 1 });

  return <View style={lineStyle} />;
};

VerticalLine.propTypes = {
  height: PropTypes.number,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  width: PropTypes.number,
  style: PropTypes.object,
}

VerticalLine.defaultProps = {
  height: null,
  style: null,
  color: Color.l_high,
  width: StyleSheet.hairlineWidth,
}

export default VerticalLine