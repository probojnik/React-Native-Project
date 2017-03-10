import { connect } from 'react-redux'
import TabsRoot from '../navigator/Tab'
import { changeTab } from '../util/navActions'

function mapStateToProps (state, ownProps) {
  console.log('mapStateToProps', state, ownProps)
  return {
    tabReducer: state.tabReducer,
    tabData: {key: 'value'},
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  // console.log('mapDispatchToProps', ownProps)
  return {
    changeTab: (route, data) => dispatch(changeTab(route, data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsRoot)
