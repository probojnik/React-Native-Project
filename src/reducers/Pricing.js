import { PUSH_ROUTE, POP_ROUTE } from '../constants/ActionTypes'
import { NavigationExperimental } from 'react-native'
import { SCENES, ROUTE } from '../constants/Scenes'

const {
 StateUtils: NavigationStateUtils
} = NavigationExperimental

const initialState = {
  index: 0,
  key: 'root',
  routes: [
    __DEV__
    ? ROUTE[SCENES.CreatePost].route // Options
    : ROUTE[SCENES.CreatePost].route
  ]
}

function pricingReducer (state = initialState, action) {
  // console.log('pricingReducer → ', action.type, action.route)
  switch (action.type) {
    case PUSH_ROUTE:
      if (state.routes[state.index].key === (action.route && action.route.key)) return state
      return NavigationStateUtils.push(state, action.route)

    case POP_ROUTE:
      if (state.index === 0 || state.routes.length === 1) return state
      return NavigationStateUtils.pop(state)

    default:
      return state
  }
}

export default pricingReducer
