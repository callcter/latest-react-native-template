import { NavigationActions, StackActions } from 'react-navigation'
import * as logUtil from './log'

export function nextPage(routeName, params, key){
  logUtil.createLog({
    type: 'statistics',
    action: 'open',
    detail: {
      page: routeName.toLowerCase(),
      params: true ? '' : JSON.stringify(params),
      code: mapping(routeName.toLowerCase(), params)
    }
  })
  let obj = {routeName: routeName, params: params}
  if(!!key || key===0){
    obj['key'] = key
  }
  return NavigationActions.navigate(obj)
}

export function refreshPage(routeName, params, key){
  logUtil.createLog({
    type: 'statistics',
    action: 'open',
    detail: {
      page: routeName.toLowerCase(),
      params: '',
      code: mapping(routeName.toLowerCase(), params)
    }
  })
  let obj = {routeName: routeName, params: params}
  if(!!key || key===0){
    obj['key'] = key
  }
  return StackActions.replace(obj)
}

export function prevPage(navigation, param){
  let route = getCurrentRoute(navigation)
  logUtil.createLog({
    type: 'statistics',
    action: 'close',
    detail: {
      page: route.toLowerCase(),
      params: ''
    }
  })
  return NavigationActions.back(param)
}

function getCurrentRoute(navigation){
  if(!!navigation.routes){
    let route = navigation.routes[navigation.index]
    if(!!route.routes){
      return getCurrentRoute(route)
    }else{
      return route.routeName
    }
  }else{
    return 'none'
  }
}

function mapping(module_name, params){
  switch(module_name){
    case 'organization':
      return params.target.code
    case 'fundamentals':
      return params.target.code
    case 'compare':
      return params.target.code
    case 'roedetail':
      return params.target.code
    case 'roeform':
      return params.target.code
    case 'roefull':
      return params.target.code
    case 'businessform':
      return params.target.code
    case 'finance':
      return params.target.code
    case 'unusual':
      return params.target.code
    case 'lstockinfo':
      return params.target.code
    case 'evaluation':
      return params.target.code
    case 'reportlist':
      return params.target.code
    case 'report':
      return params.target.code
    default:
      return ''
  }
}