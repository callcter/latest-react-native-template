module.exports = {
  dependencies: {
    'react-native-code-push': {
      platforms: {
        android: null, // 取消code-push Android的自动link,其他平台依旧
      }
    }
  }
}