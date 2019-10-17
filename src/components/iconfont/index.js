import { Animated } from 'react-native';
import iconSet from './iconfont.js';
import IconBox from './IconBox'

export default iconSet;

const AnimatedIcon = Animated.createAnimatedComponent(iconSet);

export {
  AnimatedIcon,
  IconBox,
}
