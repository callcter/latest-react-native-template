import {
  MODAL_SHOW,
  MODAL_HIDE,
  MODAL_RESET,
  MODAL_UPDATE
} from './type'
/**
 *  @params modalData[name]   'modalComment'
 *  @params modalData[type]   'bottom'
 *  @params modalData[resetAfterHide]  'false',
 *  @params modalData[onPressMask]   // ()=> this.props.modalHide('modalComment') 
 *  @params modalData[contentComponent] // (reactDom)
 */
function modalShow(modalData) {
  return (dispatch) => {
    dispatch({
      type: MODAL_SHOW,
      data: modalData
    })
  }
}

function modalUpdate(modalData) {
  return (dispatch) => {
    dispatch({
      type: MODAL_UPDATE,
      data: modalData
    })
  }
}
function modalHide(modalName) {
  return (dispatch) => {
    dispatch({
      type: MODAL_HIDE,
      data: {
        name: modalName
      }
    })
  }
}
//clear all 
function modalReset() {
  return (dispatch) => {
    dispatch({
      type: MODAL_RESET
    })
  }
}

export {
  modalShow,
  modalHide,
  modalReset,
  modalUpdate
}