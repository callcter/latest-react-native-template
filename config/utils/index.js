import * as logUtil from './log'
import * as fetchUtil from './fetch'
import * as toolUtil from './tool'
import * as reduxUtil from './redux'

export default {
  ...logUtil,
  ...fetchUtil,
  ...toolUtil,
  ...reduxUtil
}