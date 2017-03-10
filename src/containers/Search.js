import { connect } from 'react-redux'
import NavigationSearch from '../navigator/Search'
import { push_route, pop } from '../util/navActions'

function mapStateToProps (state) {
  return {
    navigationSearch: state.searchReducer,
    
  }
}

function mapDispatchToProps (dispatch) {
  return {
    pushRoute: (route, data) => {
      console.log('pushRoute', route, data)
      dispatch(push_route(route, data))
    },
    popRoute: () => dispatch(pop())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationSearch)
