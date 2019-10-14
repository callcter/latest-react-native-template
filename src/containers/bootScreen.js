import React from 'react'
import {
  View, Text, Image, StatusBar, StyleSheet, TouchableOpacity,
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import PaginationDots from '../components/carousel/paginationDots'

const styles = StyleSheet.create({
  img: {
    width: Adapter.width,
    height: Adapter.width1,
    marginTop: Adapter.space_l,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Color.white,
  },
  textContent: {
    marginBottom: 160 * rem,
  },
  text: {
    fontSize: 16 * rem,
    color: Color.f_body,
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16 * rem,
  },
  title: {
    fontSize: 22 * rem,
    color: Color.theme,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16 * rem,
  },
  doneBtn: {
    backgroundColor: Color.theme,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180 * rem,
    borderRadius: 18 * rem,
    position: 'absolute',
    height: 36 * rem,
    left: '50%',
    marginLeft: -90 * rem,
    bottom: 40 * rem,
  },
  nextBtn: {
    backgroundColor: Color.b_main,
  },
  doneBtnText: {
    fontSize: 15 * rem,
    letterSpacing: 2 * rem,
    color: 'white',
  },
  nextBtnText: {
    color: Color.f_body,
  },
})

const BootImage1 = require('../../assets/images/boot_image1.jpg')
const BootImage2 = require('../../assets/images/boot_image2.jpg')

export default class BootScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
      data: [
        {
          key: 'boot1',
          title: '标题一',
          text: '早饭吃什么呀',
          image: BootImage1,
          backgroundColor: 'white',
        },
        {
          key: 'boot2',
          title: '标题二',
          text: '午饭吃什么呀',
          image: BootImage2,
          backgroundColor: 'white',
        },
      ],
    }
  }

  async componentDidMount() {
    storage.save({
      key: 'bootpageState',
      data: {
        bootpageOpend: true,
      },
    }).catch((err) => {
      _log('eeeeeeeeeeee', err)
    })
    /* 初始时自选需要显示提示 */
    storage.save({
      key: 'optionalTip',
      data: {
        showTip: true,
      },
    })
    /* ROE变动显示提示 */
    storage.save({
      key: 'roeTip',
      data: {
        showTip: true,
      },
    })
    /* 反向估值显示提示 */
    storage.save({
      key: 'reverseTip',
      data: {
        showTip: true,
      },
    })
    /* 新手提示 */
    storage.save({
      key: 'introTips',
      data: {
        discovery: true, // 发现页的提示
        feedback: true, // 反馈入口提示
        unusual: true, // 异动入口提示
        search: true, // 搜索提示
        roe: true, // roe详情页右上角切换报告期提示
        compare: true, // 对比页右上角查看所有指标提示
      },
    })
  }

  _renderPage = ({ item }) => (
    <View style={styles.mainContent}>
      <Image style={styles.img} source={item.image} />
      <View style={styles.textContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  )

  _onSnapToItem = (index) => {
    if (this.pageDots) {
      this.pageDots.setPagination(index)
    }
    this.setState({ currentIndex: index })
  }

  _snapToItem = (index) => this._carousel.snapToItem(index)

  render() {
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <StatusBar hidden />
        <Carousel
          ref={(c) => { this._carousel = c }}
          data={this.state.data}
          autoplay={false}
          loop={false}
          renderItem={this._renderPage}
          sliderWidth={Adapter.width}
          itemWidth={Adapter.width}
          sliderHeight={Adapter.height}
          itemHeight={Adapter.height}
          inactiveSlideScale={1}
          lockScrollWhileSnapping
          inactiveSlideOpacity={1}
          firstItem={0}
          enableMomentum={false}
          activeSlideOffset={100}
          onSnapToItem={this._onSnapToItem}
        />
        <PaginationDots
          dotSize={10 * rem}
          dotSpace={16 * rem}
          dotColor={Color.theme}
          style={{ bottom: 120 * rem }}
          dotColorInactive={Color.b_main}
          ref={(r) => { this.pageDots = r }}
          carouselData={this.state.data}
        />
        {
          this.state.currentIndex < this.state.data.length - 1
            ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this._snapToItem(this.state.currentIndex + 1)}
                style={[styles.doneBtn, styles.nextBtn]}
              >
                <Text style={[styles.doneBtnText, styles.nextBtnText]}>继续</Text>
              </TouchableOpacity>
            )
            : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.doneBtn}
                onPress={() => this.props.navigation.navigate('App')}
              >
                <Text style={styles.doneBtnText}>开始体验</Text>
              </TouchableOpacity>
            )
        }
      </View>
    )
  }
}
