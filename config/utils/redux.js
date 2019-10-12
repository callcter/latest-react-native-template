import { NavigationActions, StackActions } from 'react-navigation';
import * as logUtil from './log';

function mapping(moduleName, params) {
  switch (moduleName) {
    case 'user':
      return params.target.id;
    default:
      return '';
  }
}

function getCurrentRoute(navigation) {
  if (navigation.routes) {
    const route = navigation.routes[navigation.index];
    if (route.routes) {
      return getCurrentRoute(route);
    }
    return route.routeName;
  }
  return 'none';
}

export function nextPage(routeName, params, key) {
  logUtil.createLog({
    type: 'statistics',
    action: 'open',
    detail: {
      page: routeName.toLowerCase(),
      params: routeName ? '' : JSON.stringify(params),
      code: mapping(routeName.toLowerCase(), params),
    },
  });
  const obj = { routeName, params };
  if (!!key || key === 0) {
    obj.key = key;
  }
  return NavigationActions.navigate(obj);
}

export function refreshPage(routeName, params, key) {
  logUtil.createLog({
    type: 'statistics',
    action: 'open',
    detail: {
      page: routeName.toLowerCase(),
      params: '',
      code: mapping(routeName.toLowerCase(), params),
    },
  });
  const obj = { routeName, params };
  if (!!key || key === 0) {
    obj.key = key;
  }
  return StackActions.replace(obj);
}

export function prevPage(navigation, param) {
  const route = getCurrentRoute(navigation);
  logUtil.createLog({
    type: 'statistics',
    action: 'close',
    detail: {
      page: route.toLowerCase(),
      params: '',
    },
  });
  return NavigationActions.back(param);
}
