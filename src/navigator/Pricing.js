import React, { Component } from 'react'

import {
  View,
  BackAndroid,
  NavigationExperimental
} from 'react-native'

import {Utils as util, defineNextScene} from '../util'
import { SCENES } from '../constants/Scenes'

import {CompletePostScreen, CreatePost, DataScraping, MoreInfo, Options, PostScreen, Pricing, RegisterSeller} from '../screens/Pricing'
import {OAuthLogin, WelcomeScreen} from '../screens/Login'

const {
  CardStack: NavigationCardStack
} = NavigationExperimental

export default class PricingNavigator extends Component {
  constructor (props) {
    super(props)
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
    // console.log('NavPricing', route)
    switch (route.key) {
      case SCENES.CreatePost.toString():
        return <CreatePost route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.DataScraping.toString():
        return <DataScraping route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.Options.toString():
        return <Options route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.MoreInfo.toString():
        return <MoreInfo route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.Pricing.toString():
        return <Pricing route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.OAuthLogin.toString():
        return <OAuthLogin route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.WelcomeScreen.toString():
        return <WelcomeScreen route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.RegisterSeller.toString():
        return <RegisterSeller route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.PostScreen.toString():
        return <PostScreen route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.CompletePostScreen.toString():
        return <CompletePostScreen route={route} _handleNavigate={this._handleNavigate.bind(this)}/>

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
      action = defineNextScene.pricing(action, nextSceneHelper)
    }
    // console.log('NavPricing._handleNavigate → ', action, data, nextSceneHelper)

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
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate.bind(this)}
        renderScene={this._renderScene} />
    )
  }
}
