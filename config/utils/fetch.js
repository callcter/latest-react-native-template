import NetInfo from '@react-native-community/netinfo';

export default (uri, options, args) => {
  // 处理参数 toast authJump
  const argsTemp = {
    toast: true, // 是否弹出提示
    authJump: true, // 是否在判断401后自动跳转登录
    handleData: true, // 是否判断 resJson.data 为空字符串，protobuf接口使用
    source: '', // 出处
    ...args,
  };
  const {
    toast, authJump, handleData, source,
  } = argsTemp;
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        const optionsTemp = { ...options, headers: global.headers };
        return fetch(uri, optionsTemp)
          .then((response) => {
            _log('Request', { uri, optionsTemp, argsTemp }, (new Date()).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }));
            if (!response.ok) {
              throw new Error(`${source}请求错误`);
            }
            return response.json();
          })
          .then((resJson) => {
            _log({ uri, optionsTemp, argsTemp });
            if (!uri.match('&format=pb') || resJson.code !== 200) {
              _log('Response.body', resJson);
            }
            switch (resJson.code) {
              case 200:
                if (uri.match('&format=pb')) {
                  if (handleData) {
                    if (resJson.data) {
                      resolve(resJson);
                      break;
                    } else {
                      _log(resJson);
                      throw new Error(`${source}数据错误`);
                    }
                  } else {
                    _log(resJson);
                    resolve(resJson);
                    break;
                  }
                } else {
                  resolve(resJson);
                  break;
                }
              case 401:
                // Todo: 跳转到登录页面
                if (authJump) {
                  // jumpToAuth();
                }
                throw new Error('需要登录');
              case 600:
                throw new Error('服务器错误');
              default:
                throw new Error(`${source}请求参数错误`);
            }
          })
          .catch((error) => {
            throw error;
          });
      }
      throw new Error('网络连接失败');
    }).catch((error) => {
      _log({ uri, options, argsTemp });
      if (toast) {
        // showToast(`${error}`);
      }
      reject(error);
    });
  });
};
