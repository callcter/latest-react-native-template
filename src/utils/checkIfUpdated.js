import DeviceInfo from 'react-native-device-info'

/**
 * 获取系统版本(BuildNumber)与storage存储的版本对比，判断app是否更新
 * @param {bool} saveNewVersion 是否将新版本保存到storage
 */
const checkIfUpdated = async (saveNewVersion) => {
  const _saveVersion = saveNewVersion || false
  const _deviceVersion = DeviceInfo.getBuildNumber()
  const _key = 'appVersion'
  let _result = false
  await storage.load({
    key: _key,
  }).then((ret) => {
    if (_deviceVersion !== ret.version) {
      if (_saveVersion) {
        storage.save({
          key: _key,
          data: {
            version: _deviceVersion,
          },
        })
      }
      _result = true
    }
  }).catch((err) => {
    if (err.name === 'NotFoundError' || err.name === 'ExpiredError') {
      storage.save({
        key: _key,
        data: {
          version: _deviceVersion,
        },
      })
      _result = true
    }
  })

  return _result
}

export default checkIfUpdated
