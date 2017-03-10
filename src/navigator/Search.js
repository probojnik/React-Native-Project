import React, { Component } from 'react'

import {
  View,
  BackAndroid,
  NavigationExperimental
} from 'react-native'

import {Utils as util, defineNextScene} from '../util'
import { SCENES } from '../constants/Scenes'

import { Search, SearchFilter, ShowCuratedProduct } from '../screens/Search'

const {
  CardStack: NavigationCardStack
} = NavigationExperimental

export default class SearchNavigator extends Component {
  constructor (props) {
    super(props)
    console.log('SearchNavigator', props)
    this._renderScene = this._renderScene.bind(this)
    this._handleBackAction = this._handleBackAction.bind(this)
  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
  }
  _renderScene (props) {
    const { route } = props.scene
    console.log('SearchNavigator _renderScene', props)

    switch (route.key) {
      case SCENES.Search.toString():
        return <Search route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.SearchFilter.toString():
        return <SearchFilter route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.ShowCuratedProduct.toString():
        return <ShowCuratedProduct route={route} changeTab={props.changeTab} _handleNavigate={this._handleNavigate.bind(this)}/>

      default:
        return null
    }
  }

  _handleBackAction () {
    if (this.props.navigation.index === 0) {
      return false
    }
    this.props.popRoute()
    return true
  }

  _handleNavigate (action, data, nextSceneHelper) {
    if(typeof action === 'symbol') {
      action = defineNextScene.search(action, nextSceneHelper)
    }
    console.log('_handleNavigate', action, data, action && action.type);

    if(action == null) {
      console.warn('last scene')
      return false
    }
    switch (action && action.type) {
      case 'push':
        this.props.pushRoute(action.route, data)
        return true
      case 'back':
      case 'pop':
        return this._handleBackAction()
      default:
        return false
    }
  }

  render () {
    return (
      <NavigationCardStack
        navigationState={this.props.navigationSearch}
        onNavigate={this._handleNavigate.bind(this)}
        renderScene={this._renderScene} />
    )
  }
}
