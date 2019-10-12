import { createIconSet } from 'react-native-vector-icons';
import glyphMap from './iconfont.json';

const iconSet = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf');

export default iconSet;

export const {
  Button, TabBarItem, TabBarItemIOS, ToolbarAndroid,
} = iconSet;
export const getImageSource = iconSet.getImageSourcess;
