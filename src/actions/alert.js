import {
  ALERT_SHOW,
  ALERT_HIDE,
  ALERT_RESET
} from './type'

function alertShow(alertData) {
  return (dispatch) => {
    dispatch({
      type: ALERT_SHOW,
      data: alertData
    })
  }
}

function alertHide() {
  return (dispatch) => {
    dispatch({
      type: ALERT_HIDE
    })
  }
}

function alertReset() {
  return (dispatch) => {
    dispatch({
      type: ALERT_RESET
    })
  }
}

export {
  alertShow,
  alertHide,
  alertReset
}