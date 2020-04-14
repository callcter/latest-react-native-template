import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import checkIfUpdated from '../utils/checkIfUpdated'
import * as AuthActionCreators from '../actions/auth'

class LoadingScreen extends React.Component {
  async componentDidMount() {
    /* 游客模式下检查用户的登录状态 */
    this.props.loginedCheck()
    const bootPage = await storage.load({ key: 'bootPageState' }).then((ret) => ret).catch(() => false)
    const updated = await checkIfUpdated(true)
    const needBoot = true || !bootPage.bootPageOpened || updated

    /* 游客模式 */
    if (needBoot) {
      this.props.navigation.navigate('Boot')
    } else {
      this.props.navigation.navigate('App')
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading</Text>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ ...AuthActionCreators }, dispatch)

export default connect(null, mapDispatchToProps)(LoadingScreen)