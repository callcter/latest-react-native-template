import { LOAD_NEWS_DATA, LOAD_NEWS_DATA_ERROR } from '../actions/type';

const initialState = {};

export default (state = initialState, action) => {
  const actionData = action.data ? action.data : {};
  switch (action.type) {
    case LOAD_NEWS_DATA:
      return Object.assign(state, actionData);
    case LOAD_NEWS_DATA_ERROR:
      return Object.assign(state, actionData);
    default:
      return state;
  }
};
