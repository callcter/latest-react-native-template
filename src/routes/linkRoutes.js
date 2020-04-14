import { Path } from 'path-parser'
import store from '../reducers'

const paths = [
  {
    routeName: 'Organization',
    path: new Path('/organization/:code'),
  },
]

const findPath = (url) => {
  const idx = _.findIndex(paths, (p) => p.path.test(url))
  return idx > -1 ? paths[idx] : false
}

export default (url) => {
  const pathObj = findPath(url)
  if (!pathObj) return
  let params = null
  _log('path-parser------------------', pathObj.path.test(url))
  switch (pathObj.routeName) {
    case 'Organization':
      params = {
        orgs: null,
        target: pathObj.path.test(url),
      }
      break
    default:
      params = pathObj.path.test(url)
      break
  }
  store.dispatch(nextPage(pathObj.routeName, params))
}