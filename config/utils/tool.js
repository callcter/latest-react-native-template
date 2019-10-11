const _log = (...msg) => {
  let tag = 'loggggg  --------> '
  if(__DEV__){
    console.log(tag, ...msg)
  }
}

const _trace = (...msg) => {
  let tag = 'traceeeee  --------> '
  if(__DEV__){
    console.trace(tag, ...msg)
  }
}

export {
  _log,
  _trace
}