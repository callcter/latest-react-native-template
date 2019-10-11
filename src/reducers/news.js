import { LOAD_NEWS_DATA, LOAD_NEWS_DATA_ERROR } from '../actions/type'
const initialState = {}

export default news = (state = initialState, action) => {
  let action_data = !!action.data ? action.data : {}
  switch(action.type){
    case LOAD_NEWS_DATA:
      return Object.assign(state, action_data)
    case LOAD_NEWS_DATA_ERROR:
      return Object.assign(state, action_data)
    default:
      return state
  }
}