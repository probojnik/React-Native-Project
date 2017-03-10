import { connect } from 'react-redux'
import NavigationCheckout from '../navigator/Checkout'
import { push_route, pop } from '../util/navActions'

function mapStateToProps (state) {
  return {
    navigationCheckout: state.checkoutReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pushRoute: (route, data) => {
      dispatch(push_route(route, data))
    },
    popRoute: () => dispatch(pop())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationCheckout)
