import { connect } from 'react-redux'
import NavigationHome from '../navigator/Home'
import { push, pop } from '../util/navActions'

function mapStateToProps (state) {
  return {
    navigationStateHome: state.homeReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pushRoute: (route) => dispatch(push(route)),
    popRoute: () => dispatch(pop())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationHome)
