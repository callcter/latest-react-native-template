const _log = (...msg) => {
  const tag = 'loggggg  --------> ';
  if (__DEV__) {
    console.log(tag, ...msg);
  }
};

const _trace = (...msg) => {
  const tag = 'traceeeee  --------> ';
  if (__DEV__) {
    console.trace(tag, ...msg);
  }
};

export {
  _log,
  _trace,
};
