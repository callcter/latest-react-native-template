import { LOAD_USER_DATA, LOAD_USER_DATA_ERROR } from '../actions/type';

const initialState = {};

export default user = (state = initialState, action) => {
  const actionData = action.data ? action.data : {};
  switch (action.type) {
    case LOAD_USER_DATA:
      return Object.assign(state, actionData);
    case LOAD_USER_DATA_ERROR:
      return Object.assign(state, actionData);
    default:
      return state;
  }
};
