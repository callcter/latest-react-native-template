import React from 'react'
import { AppState, View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createReduxContainer } from 'react-navigation-redux-helpers'
import { MenuProvider } from 'react-native-popup-menu'
import store from './src/reducers'
import AppNavigator from './src/routes/AppNavigator'
import PopAlert from './src/components/popup/PopAlert'
import PopModal from './src/components/popup/PopModal'
import Toast from './src/components/toast'

const ReduxAppNavigator = createReduxContainer(AppNavigator)

let lastBackPressed = Date.now()

class AppWithNavigationState extends React.Component {
  handleFirstConnectivityChange(connectionInfo){
    if(connectionInfo.type.toLowerCase() == 'none'){
      _log('断网')
      // 确定断网处理页面
      // this.props.dispatch(NavigationActions.navigate(''))
    }
  }
  async componentDidMount(){
    if(Platform.OS==='android'){
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
      await requestPermission()
    }
    NetInfo.addEventListener('connectionChange', this.handleFirstConnectivityChange)
  }
  componentWillUnmount(){
    if(Platform.OS==='android'){
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }
    NetInfo.removeEventListener('connectionChange')
  }
  onBackPress = () => {
    const { dispatch, nav, alertState, modalState } = this.props
    if(ModalBackPress({dispatch, alertState, modalState})) {
      return true
    } else {
      if(!nav.routes[nav.index].index){
        if(lastBackPressed && Date.now() -lastBackPressed <= 2000){
          BackHandler.exitApp()
          return false
        }
        lastBackPressed = Date.now()
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT)
        return true
      }else{
        dispatch(prevPage(nav))
        return true
      }
    }
  }
  render(){
    const { dispatch, nav, alertState, modalState } = this.props
    return (
      <View style={{flex:1, flexDirection: 'column', position:'relative'}}>
        <ReduxAppNavigator dispatch={dispatch} state={nav} />
        {
          _.map(modalState.modalList, (item,index)=><PopModal key={index} {...item} />)
        }
        <PopAlert {...alertState} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
    alertState: state.alert,
    modalState: state.modal
  }
}

AppWithNavigationState = connect(mapStateToProps)(AppWithNavigationState)

export default class Root extends React.Component {
  async componentDidMount(){
    AppState.addEventListener('change', this._handleAppStateChange)
  }
  componentWillUnmount(){
    AppState.removeEventListener('change', this._handleAppStateChange)
  }
  render() {
    return (
      <Provider store={store}>
        <MenuProvider>
          {
            <AppWithNavigationState />
          }
        </MenuProvider>
        <Toast
          ref={ref => this.toast = ref}
          position='center'
          fadeInDuration={250}
          fadeOutDuration={500}
          opacity={0.85}
          style={{zIndex: 10000}} />
      </Provider>
    )
  }
  _handleAppStateChange = (nextAppState) => {
    if(nextAppState==='active'){
      Linking.getInitialURL().then(res => {
        if(!!res){
          LinkRoutes(res.split(':/')[1])
        }
      })
    }else{
      _log(nextAppState)
    }
  }
}

async function requestPermission(){
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
    ])
    if (granted === PermissionsAndroid.RESULTS.GRANTED){}
  } catch (err) {}
}