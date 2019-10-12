
import {
  ALERT_HIDE,
  MODAL_HIDE,
} from '../actions/type'

export default (props) => {
  const { dispatch, alertState, modalState } = props
  let hasModalShowing = false
  let modalName = ''
  _.map(modalState.modalList, (item) => {
    if (item.show) {
      hasModalShowing = true
      modalName = item.name
    }
  })
  if (alertState.show) {
    dispatch({ type: ALERT_HIDE })
    return true
  } if (hasModalShowing) {
    dispatch({
      type: MODAL_HIDE,
      data: {
        name: modalName,
      },
    })
    return true
  }
  return false
}