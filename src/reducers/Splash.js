import { NavigationExperimental } from 'react-native'

import { PUSH_ROUTE_SPLASH } from '../constants/ActionTypes'
import { SCENES, ROUTE } from '../constants/Scenes'

const {
 StateUtils: NavigationStateUtils
} = NavigationExperimental

const initialState = {
  index: 0,
  key: 'root',
  routes: [
    __DEV__
    // ? ROUTE[SCENES.TabContainer].route
    ? ROUTE[SCENES.Splash].route
    : ROUTE[SCENES.Splash].route
  ]
}

function splashReducer (state = initialState, action) {
  // console.log('splashReducer → ', action.type, action.route)
  switch (action.type) {
    case PUSH_ROUTE_SPLASH:
      if (state.routes[state.index].key === (action.route && action.route.key)) return state
      return NavigationStateUtils.push(state, action.route)

    default:
      return state
  }
}

export default splashReducer
