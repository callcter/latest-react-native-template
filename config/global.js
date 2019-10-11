import Color from './color'
import Adapter from './adapter'
import Api from './api'

global.Adapter = Adapter
global.Color = Color
global.Api = Api
global.rem = Adapter.REM

import AsyncStorage from '@react-native-community/async-storage'
import Storage from 'react-native-storage'
import _ from 'lodash'
import NP from 'number-precision'

global._ = _
global.NP = NP

import moment from 'moment'
require('moment/locale/zh-cn')
moment.locale('zh-cn')

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync: ()=>{}
})

global.user = null
global.headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
global.device_token = ''
global.storage = storage

import Utils from './utils'
global.createLog = Utils.createLog
global.initLogs = Utils.initLogs
global._fetch = Utils._fetch
global.fetchPro = Utils.fetchPro
global._log = Utils._log
global._trace = Utils._trace
global.prevPage = Utils.prevPage
global.nextPage = Utils.nextPage
global.refreshPage = Utils.refreshPage











import { YellowBox, Text, TextInput, TouchableOpacity } from 'react-native'

// 忽略 warning 提醒
YellowBox.ignoreWarnings([
  'Warning: RNCNetInfo',
  'RCTBridge required dispatch_sync',
  'Required dispatch_sync',
  'Require cycles'
])

// Text、TextInput 全局配置
TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {defaultProps: false, underlineColorAndroid: 'transparent'})
Text.defaultProps = Object.assign({}, Text.defaultProps, {
  allowFontScaling: false,  // 不跟随系统字体大小变化
  fontSize: 14,
  color: Color.f_body,
  selectable: true
})
TouchableOpacity.defaultProps = Object.assign({}, TouchableOpacity.defaultProps, {
  activeOpacity: 0.9
})


// 异常捕捉处理
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler'

setJSExceptionHandler((e, isFatal) => {
  createLog({
    type: isFatal ? 'crash' : 'error',
    action: 'js_exception',
    detail: {
      isFatal: isFatal,
      log: JSON.stringify(e)
    }
  })
})

setNativeExceptionHandler((errorString) => {
  createLog({
    type: 'crash',
    action: 'native_exception',
    detail: {
      log: errorString
    }
  })
})