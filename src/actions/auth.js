import { LOAD_AUTH_DATA } from './type'

const { TokenPrefix } = Api

export function loginedCheck() {
  return (dispatch) => {
    storage.load({ key: 'token' }).then((token) => {
      headers = Object.assign(headers, { Authorization: token })
      const user_info = {
        id: 1,
        nickname: 'callcter',
        avatar: 'https://pic.feizl.com/upload/allimg/190809/gxtxl14tghm2se4.jpg',
      }
      storage.save({
        key: 'userinfo',
        data: user_info,
      })
      dispatch({
        type: LOAD_AUTH_DATA,
        data: {
          is_logined: true,
          user_info: user_info,
        },
      })
    }).catch(() => {
      dispatch({
        type: LOAD_AUTH_DATA,
        data: {
          is_logined: false,
        },
      })
    })
  }
}

export function signIn() {
  return (dispatch) => {
    const token = 'IKvtRi0PZMzeTE3K80HvFly5ph0rDC2d7HucfAVb1Lk7sdHBzQYZfEmjpEfKBCF'
    const user_info = {
      id: 1,
      nickname: 'callcter',
      avatar: 'https://pic.feizl.com/upload/allimg/190809/gxtxl14tghm2se4.jpg',
    }
    headers = Object.assign(headers, {
      Authorization: TokenPrefix + token,
    })
    showToast('登录成功')
    storage.save({
      key: 'userinfo',
      data: user_info,
    })
    storage.save({
      key: 'token',
      data: token,
    })
    dispatch({
      type: LOAD_AUTH_DATA,
      data: {
        is_logined: true,
        user_info: user_info,
      },
    })
    dispatch(nextPage('App'))
  }
}