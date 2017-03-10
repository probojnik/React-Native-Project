import React, { Component } from 'react'

import {
  View,
  Text,
  NavigationExperimental,
} from 'react-native'

const {
  CardStack: NavigationCardStack
} = NavigationExperimental

import Splash from '../screens/Splash/Splash'
import OAuthLogin from '../screens/Login/OAuthLogin'
import WelcomeScreen from '../screens/Login/WelcomeScreen'

import ChildAge from '../screens/Onboarding/ChildAge'
import ChildGender from '../screens/Onboarding/ChildGender'
import GearKind from '../screens/Onboarding/GearKind'
import LocationPrompt from '../screens/Onboarding/LocationPrompt'
import Location from '../screens/Onboarding/Location'

import TabContainer from '../containers/Tab'

import { SCENES } from '../constants/Scenes'
import { util, defineNextScene } from '../util'

export default class SplashNavigator extends Component {
  constructor (props) {
    super(props)
  }

  _handleNavigate (action, data, nextSceneHelper) {
    console.log('SplashNavigator _handleNavigate', action, data, nextSceneHelper);
    if(typeof action === 'symbol') {
      action = defineNextScene.splash(action, nextSceneHelper)
    }

    if(action == null) {
      console.warn('last scene')
      return false
    }

    switch (action && action.type) {
      case 'push':
        this.props.pushRoute(action.route, data)
        return true
      default:
        return false
    }
  }

  _renderScene (props) {
    // console.log('NavSplash111', props.scene, this.props)
    const { loginStore } = this.props
    const { route } = props.scene
    switch (route.key) {
      case SCENES.Splash.toString():
        return <Splash route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.OAuthLogin.toString():
        return <OAuthLogin route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.WelcomeScreen.toString():
        return <WelcomeScreen route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.ChildAge.toString():
        return <ChildAge route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.ChildGender.toString():
        return <ChildGender route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.GearKind.toString():
        return <GearKind route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.LocationPrompt.toString():
        return <LocationPrompt route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.Location.toString():
        return <Location route={route} _handleNavigate={this._handleNavigate.bind(this)}/>

      case SCENES.TabContainer.toString():
        return <TabContainer loginStore={loginStore}/>

      default:
        return null
    }
  }

  render(){

    return (
      <NavigationCardStack
        navigationState={this.props.navigationSplash}
        onNavigate={this._handleNavigate.bind(this)}
        renderScene={this._renderScene.bind(this)} />
    )
  }
}
