import React, { Component } from 'react'

import {
  View,
  BackAndroid,
  NavigationExperimental
} from 'react-native'

import {Utils as util, defineNextScene} from '../util'
import {SCENES} from '../constants/Scenes'

import {ProductAddToCart, Checkout, EnterNameAddress, EnterPaymentInfoPurchase} from '../screens/Checkout'

const {
  CardStack: NavigationCardStack
} = NavigationExperimental

export default class CheckoutNavigator extends Component {
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
    // console.log('NavSearch', props, route)

    switch (route.key) {
      case SCENES.ProductAddToCart.toString():
        return <ProductAddToCart route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.Checkout.toString():
        return <Checkout route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.EnterNameAddress.toString():
        return <EnterNameAddress route={route} _handleNavigate={this._handleNavigate.bind(this)}/>
      case SCENES.EnterPaymentInfoPurchase.toString():
        return <EnterPaymentInfoPurchase route={route} _handleNavigate={this._handleNavigate.bind(this)}/>

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
      action = defineNextScene.checkout(action, nextSceneHelper)
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
        navigationState={this.props.navigationCheckout}
        onNavigate={this._handleNavigate.bind(this)}
        renderScene={this._renderScene} />
    )
  }
}
