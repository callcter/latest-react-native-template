import NetInfo from '@react-native-community/netinfo'

const fetchPro = (uri, options, args) => {
  // 处理参数 toast authJump
  args = Object.assign({
    toast: true,  // 是否弹出提示
    authJump: true,  // 是否在判断401后自动跳转登录
    handleData: true,  // 是否判断 resJson.data 为空字符串，protobuf接口使用
    source: ''  // 出处
  }, args)
  let toast = args['toast']
  let authJump = args['authJump']
  let handleData = args['handleData']
  let source = args['source']
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then(state => {
      if(state.isConnected){
        options = Object.assign({}, options, { headers: global.headers })
          return fetch(uri, options)
          .then(response =>{
            _log('Request', {uri, options, args}, (new Date()).toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'}))
            if(!response.ok){
              throw new Error(`${source}请求错误`)
            }
            return response.json()
          })
          .then(resJson => {
            _log({uri, options, args})
            if(!uri.match('&format=pb') || resJson.code !== 200){
              _log('Response.body', resJson)
            }
            switch(resJson.code){
              case 200:
                if(uri.match('&format=pb')){
                  if(handleData){
                    if(!!resJson.data){
                      resolve(resJson)
                      break
                    }else{
                      _log(resJson)
                      throw (`${source}数据错误`)
                    }
                  }else{
                    _log(resJson)
                    resolve(resJson)
                    break
                  }
                }else{
                  resolve(resJson)
                  break
                }
              case 401:
                // Todo: 跳转到登录页面
                authJump && jumpToAuth()
                throw ('需要登录')
              case 600:
                throw new Error(`服务器错误`)
              default:
                throw new Error(`${source}请求参数错误`)
            }
          })
          .catch(error => {
            throw error
          })
      }else{
        throw new Error(`网络连接失败`)
      }
    }).catch(error => {
      _log({uri, options, args})
      if(toast){
        showToast(`${error}`)
      }
      reject(error)
    })
  })
}

const _fetch = (uri, options, ...args) => {
  options = Object.assign({}, options, { headers: global.headers })
  return NetInfo.fetch().then(state => {
    if(state.isConnected){
      return fetch(uri, options, ...args).then((response) =>{
        // _log('Request', {uri, options, ...args}, (new Date()).toLocaleString('zh-CN', {timeZone: 'Asia/Shanghai'}))
        return response.json()
      }).then(resJson => {
        _log({uri, options, args})
        if(!uri.match('&format=pb') || resJson.code !== 200){
          _log('Response.body', resJson)
        }
        return resJson
      }).catch(err => {
        showToast(`错误：${err}`)
        _log('Fetch Error', err)
        return {}
      })
    }else{
      throw new Error('网络连接失败')
    }
  }).catch(error => {
    showToast(`错误：${error}`)
  })
}

export {
  fetchPro,
  _fetch
}