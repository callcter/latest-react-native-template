
import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import _ from 'lodash';
import NP from 'number-precision';

import moment from 'moment';


import {
  YellowBox, Text, TextInput, TouchableOpacity,
} from 'react-native';


// 异常捕捉处理
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import PropTypes from 'prop-types';
import Utils from './utils';
import Api from './api';
import Adapter from './adapter';
import Color from './color';

global.PropTypes = PropTypes;
global.Adapter = Adapter;
global.Color = Color;
global.Api = Api;
global.rem = Adapter.REM;

global._ = _;
global.NP = NP;
require('moment/locale/zh-cn');

moment.locale('zh-cn');

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
  sync: () => {},
});

global.user = null;
global.headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
global.device_token = '';
global.storage = storage;
global.createLog = Utils.createLog;
global.initLogs = Utils.initLogs;
global._fetch = Utils._fetch;
global._log = Utils._log;
global._trace = Utils._trace;
global.prevPage = Utils.prevPage;
global.nextPage = Utils.nextPage;
global.refreshPage = Utils.refreshPage;

// 忽略 warning 提醒
YellowBox.ignoreWarnings([
  'Warning: RNCNetInfo',
  'RCTBridge required dispatch_sync',
  'Required dispatch_sync',
  'Require cycles',
]);

// Text、TextInput 全局配置
TextInput.defaultProps = { ...TextInput.defaultProps, defaultProps: false, underlineColorAndroid: 'transparent' };
Text.defaultProps = {
  ...Text.defaultProps,
  allowFontScaling: false, // 不跟随系统字体大小变化
  fontSize: 14,
  color: Color.f_body,
  selectable: true,
};
TouchableOpacity.defaultProps = { ...TouchableOpacity.defaultProps, activeOpacity: 0.9 };

setJSExceptionHandler((e, isFatal) => {
  createLog({
    type: isFatal ? 'crash' : 'error',
    action: 'js_exception',
    detail: {
      isFatal,
      log: JSON.stringify(e),
    },
  });
});

setNativeExceptionHandler((errorString) => {
  createLog({
    type: 'crash',
    action: 'native_exception',
    detail: {
      log: errorString,
    },
  });
});
