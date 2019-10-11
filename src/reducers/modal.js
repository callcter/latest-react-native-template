import { 
  MODAL_SHOW, 
  MODAL_HIDE, 
  MODAL_RESET,
  MODAL_UPDATE
} from '../actions/type'


const initialState = {
  modalList: []
}

const initialZIndex = 100

const initialData = {
  name: '',
  show: false,
  animDuration: 300,
  zIndex: initialZIndex,
  onPressMask: null,
  type: 'center', //'top','right','bottom','left','center','full' 六种类型的弹窗
  width: '80%',
  height: null,
  space: null,
  maxHeight: null,
  contentComponent: null,
  afterHide: null,
  afterShow: null,
  resetAfterHide: true
}

const modalReducer = (state = initialState, action) => {
  switch(action.type){
    case MODAL_SHOW:
      const newData = Object.assign({}, {...initialData}, action.data, {show: true, zIndex: initialZIndex + state.modalList.length})
      state.modalList.push(newData)
      return Object.assign({}, {...state})
    case MODAL_HIDE:
      /*
      var index1 = _.findIndex(state.modalList,(item)=>{
        return item.name==action.data.name
      })
      if(index1>=0){
        var tem1 = [...state.modalList]
        var mod1 = Object.assign({},{...tem1[index1]},{show:false})
        tem1.splice(index1,1,mod1)
      }
      return Object.assign({}, {modalList:tem1})*/
      _.map(state.modalList, (item)=>{
        if(item.name === action.data.name) {
          item.show = false
        }
      })
      return Object.assign({}, {...state})
    case MODAL_UPDATE:
      var index = _.findIndex(state.modalList,(item)=>{
        return item.name==action.data.name
      })
      if(index>=0){
        var tem = [...state.modalList]
        var mod = Object.assign({},{...tem[index]},{...action.data})
        tem.splice(index,1,mod)
      }
      return Object.assign({}, {modalList:tem})
    case MODAL_RESET:
      _.remove(state.modalList, (item)=>{
        return !item.show
      })
      return Object.assign({}, {...state})
    default:
      return state
  }
}

export default modalReducer