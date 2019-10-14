export function goBack(key) {
  return (dispatch, getState) => {
    const { nav } = getState()
    if (key) {
      dispatch(prevPage(nav, { key: key }))
    } else {
      dispatch(prevPage(nav))
    }
  }
}

export function goUserConfig() {
  _log('user')
}