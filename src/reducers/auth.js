import { LOAD_AUTH_DATA, LOAD_AUTH_DATA_ERROR } from '../actions/type';

const initialState = {};

export default user = (state = initialState, action) => {
  const actionData = action.data ? action.data : {};
  switch (action.type) {
    case LOAD_AUTH_DATA:
      return Object.assign(state, actionData);
    case LOAD_AUTH_DATA_ERROR:
      return Object.assign(state, actionData);
    default:
      return state;
  }
};
