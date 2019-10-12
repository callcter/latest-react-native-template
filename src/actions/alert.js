import { ALERT_SHOW, ALERT_HIDE, ALERT_RESET } from './type';

export function alertShow(alertData) {
  return (dispatch) => {
    dispatch({
      type: ALERT_SHOW,
      data: alertData,
    });
  };
}

export function alertHide() {
  return (dispatch) => {
    dispatch({
      type: ALERT_HIDE,
    });
  };
}

export function alertReset() {
  return (dispatch) => {
    dispatch({
      type: ALERT_RESET,
    });
  };
}
