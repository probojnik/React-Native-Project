import { combineReducers } from 'redux'
import homeReducer from './Home'
import pricingReducer from './Pricing'
import tabReducer from './Tab'
import splashReducer from './Splash'
import searchReducer from './Search'
import checkoutReducer from './Checkout'

const rootReducer = combineReducers({
  homeReducer,
  pricingReducer,
  tabReducer,
  splashReducer,
  searchReducer,
  checkoutReducer,
})

export default rootReducer
