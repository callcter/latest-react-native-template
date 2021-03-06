import { ALERT_SHOW, ALERT_HIDE, ALERT_RESET } from '../actions/type';

const initialState = {
  show: false,
  animDuration: 300,
  zIndex: 1080,
  onPressMask: null,
  title: '提示',
  content: '',
  contentComponent: null,
  btns: [],
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_SHOW:
      return { ...state, show: true, ...action.data };
    case ALERT_HIDE:
      return { ...state, show: false };
    case ALERT_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default alertReducer;
