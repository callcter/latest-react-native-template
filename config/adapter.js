import { Dimensions, PixelRatio, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ExtraDimensions from 'react-native-extra-dimensions-android';

const isIOS = Platform.OS === 'ios';
const screen = Dimensions.get('window');
const { width } = screen;
const height = isIOS ? screen.height : ExtraDimensions.getRealWindowHeight();
const density = PixelRatio.get();

// 设计图以 iphone 6 为标准
const BASE_WIDTH = 375;
// const BASE_HEIGHT = 667;
const finalWidth = width > 500 ? 500 : width;
const rem = finalWidth / BASE_WIDTH;
/**
 * 设备属性
 */
const adapter = {
  isIOS,
  width,
  height,
  height_rn: screen.height,
  height_c: height - getStatusBarHeight() - 44 * rem, // 基本内容高度
  height_n: ExtraDimensions.getSoftMenuBarHeight(), // 虚拟导航栏的高度(Android)
  height_f: 44 * rem, // footer 高度
  height_h: 44 * rem, // header 高度
  height_t: 44 * rem, // tab 高度
  height_sb: getStatusBarHeight(), // status bar 高度
  height_searchbar: 30 * rem,
  height_nav: 52 * rem, // 底部主导航高度
  height_titlebar: 54 * rem, // 公司详情页等每个板块标题的高度
  header_icon_size: 28 * rem,

  fs_tab: 16 * rem, // tab默认字体大小
  fs_title: 16 * rem, // 标题字体大小
  fs_body: 14 * rem, // 正文字体大小
  fs_assist: 12 * rem, // 辅助说明字体大小

  ifs_header: 24 * rem,
  ifs_title: 18 * rem, // 标题字体大小
  ifs_tab: 16 * rem, // 标题字体大小
  ifs_body: 14 * rem, // 正文字体大小
  ifs_assist: 12 * rem, // 辅助说明字体大小

  fs_article: 18 * rem, // 文章正文字体大小
  fs_table: 14 * rem, // 文章表格字体大小
  fs_feedbody: 15 * rem, // 讨论等feed流常规字体大小

  space_l: 20 * rem,
  space: 15 * rem,
  space_s: 10 * rem,
  space_sp: 8 * rem, // 间隔大小
  space_ss: 7 * rem, // 间隔大小

  size_avatar: 36 * rem, // feed流等处通用的头像大小

  carousel_ratio: 176 / 710, // 首页轮播的高宽比
  header_avatar_size: 30 * rem, // 顶部栏头像大小

  density,
  PX: 1 / density,
  lineWidth: density >= 3 ? 2 / density : 1 / density, // 有些分辨率高的安卓手机，细线会消失，可以用此值来作为线条的宽度
  REM: rem,
};

export default adapter;
