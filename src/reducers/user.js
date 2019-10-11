import { LOAD_USER_DATA, LOAD_USER_DATA_ERROR } from '../actions/type'
const initialState = {}

export default user = (state = initialState, action) => {
  let action_data = !!action.data ? action.data : {}
  switch(action.type){
    case LOAD_USER_DATA:
      return Object.assign(state, action_data)
    case LOAD_USER_DATA_ERROR:
      return Object.assign(state, action_data)
    default:
      return state
  }
}