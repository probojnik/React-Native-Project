import { connect } from 'react-redux'
import NavigationPricing from '../navigator/Pricing'
import { push_route, pop } from '../util/navActions'

function mapStateToProps (state) {
  return {
    navigation: state.pricingReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pushRoute: (route, data) => {
      // console.log('pushRoute', route, data)
      dispatch(push_route(route, data))
    },
    popRoute: () => dispatch(pop())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationPricing)
