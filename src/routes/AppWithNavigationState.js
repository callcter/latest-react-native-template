import React from 'react'
import {
  View, PermissionsAndroid, BackHandler, ToastAndroid,
} from 'react-native'
import { connect } from 'react-redux'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import NetInfo from '@react-native-community/netinfo'
import AppNavigator from './AppNavigator'
import PopAlert from '../components/popup/PopAlert'
import PopModal from '../components/popup/PopModal'
import ModalBackPress from '../utils/modalBackPress'

const ReduxAppNavigator = createReduxContainer(AppNavigator)

let lastBackPressed = Date.now()

async function requestPermission() {
  await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
  ])
}

class AppWithNavigationState extends React.Component {
  async componentDidMount() {
    if (!Adapter.isIOS) {
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
      await requestPermission()
    }
    NetInfo.addEventListener('connectionChange', this.handleFirstConnectivityChange)
  }

  componentWillUnmount() {
    if (!Adapter.isIOS) {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }
    NetInfo.removeEventListener('connectionChange')
  }

  onBackPress = () => {
    const {
      dispatch, nav, alertState, modalState,
    } = this.props
    if (ModalBackPress({ dispatch, alertState, modalState })) {
      return true
    }
    if (!nav.routes[nav.index].index) {
      if (lastBackPressed && Date.now() - lastBackPressed <= 2000) {
        BackHandler.exitApp()
        return false
      }
      lastBackPressed = Date.now()
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
      return true
    }
    dispatch(prevPage(nav))
    return true
  }

  handleFirstConnectivityChange = (connectionInfo) => {
    if (connectionInfo.type.toLowerCase() === 'none') {
      _log('断网')
      // todo 确定断网处理页面
      // this.props.dispatch(NavigationActions.navigate(''))
    }
  }

  render() {
    const {
      dispatch, nav, alertState, modalState,
    } = this.props
    return (
      <View style={{ flex: 1, flexDirection: 'column', position: 'relative' }}>
        <ReduxAppNavigator dispatch={dispatch} state={nav} />
        {
          _.map(modalState.modalList, (item, index) => <PopModal key={index} {...item} />)
        }
        <PopAlert {...alertState} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
  alertState: state.alert,
  modalState: state.modal,
})

export default connect(mapStateToProps)(AppWithNavigationState)