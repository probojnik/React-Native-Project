import { connect } from 'react-redux'
import NavigationSplash from '../navigator/Splash'
import { push_splash } from '../util/navActions'

function mapStateToProps (state) {
  return {
    navigationSplash: state.splashReducer,
    loginStore: {account: 'john'}
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pushRoute: (route, data) => dispatch(push_splash(route, data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationSplash)
