import { POP_ROUTE, PUSH_ROUTE, CHANGE_TAB, PUSH_ROUTE_SPLASH } from '../constants/ActionTypes'

export function push_route (route, data) {
  // console.log('action push', route, data);
  return {
    type: PUSH_ROUTE,
    route: {...route, data},
  }
}

export function pop () {
  return {
    type: POP_ROUTE,
  }
}

export function changeTab (index, data) {
  // console.log(index)
  return {
    type: CHANGE_TAB,
    index,
    data,
  }
}

export function push_splash (route, data) {
  return {
    type: PUSH_ROUTE_SPLASH,
    route: {...route, data},
  }
}
