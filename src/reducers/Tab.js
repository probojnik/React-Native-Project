import { CHANGE_TAB } from '../constants/ActionTypes'
import { Images } from '../../Themes';
import { TAB } from '../constants/Tab'

const tabs = {
  [TAB.Home.s()]: {
    key: TAB.Home.s(),
    icon: Images.menu_home
  },
  [TAB.Search.s()]: {
    key: TAB.Search.s(),
    icon: Images.menu_search
  },
  [TAB.Sell.s()]: {
    key: TAB.Sell.s(),
    icon: Images.menu_photo
  },
  [TAB.Checkout.s()]: {
    key: TAB.Checkout.s(),
    icon: Images.menu_cart
  },
  [TAB.Profile.s()]: {
    key: TAB.Profile.s(),
    icon: Images.menu_profile
  }
}

const initialState = {
  index: __DEV__
    ? TAB.Sell.s()
    : TAB.Search.s()
  , tabs
}

export default function tabsNav (state = initialState, action) {
  if (action.index === state.index) return state
  switch (action.type) {
    case CHANGE_TAB:
      return {
        ...state,
        index: action.index
      }
    default:
      return state
  }
}
