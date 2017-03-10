import React, { Component } from 'react'
import { View, StatusBar, TabBarIOS } from 'react-native'
import _ from 'lodash'

import HomeSingle from '../screens/Home/Home'
import Home from '../containers/Home'
import Sell from '../containers/Pricing'
import Checkout from '../containers/Checkout'
import Search from '../containers/Search' //'../screens/Search/Search'
import { TAB } from '../constants/Tab'

export default class TabNavigator extends Component {
  constructor (props) {
    super(props)
    console.log('TabNavigator', props)
  }

  _changeTab (i) {
    const { changeTab } = this.props
    console.log('_changeTab', i, changeTab)
    changeTab(i, {})
  }

  _renderTabContent (key) {
    const { changeTab, tabData, loginStore } = this.props
    console.log('_renderTabContent', key)
    switch (key) {
      case TAB.Home.s(): return <Home/>
      case TAB.Search.s(): return <Search changeTab={changeTab}/>
      case TAB.Sell.s(): return <Sell/>
      case TAB.Checkout.s(): return <Checkout tabData={tabData}/>
      case TAB.Profile.s(): return <HomeSingle loginStore={loginStore} testIdrntificator='Profile'/> // <Profile/>
    }
  }

  render () {
    const tabs = _.map(this.props.tabReducer.tabs, (tab, key) => {
      return (
        <TabBarIOS.Item
          key={tab.key}
          icon={tab.icon}
          selectedIcon={tab.selectedIcon}
          title={tab.title}
          onPress={() => this._changeTab(tab.key)}
          selected={this.props.tabReducer.index === tab.key}>
          {this._renderTabContent(tab.key)}
        </TabBarIOS.Item>
      )
    })

    return (
        <TabBarIOS
          tintColor="green"
          barTintColor="white">
          {tabs}
        </TabBarIOS>
    )
  }
}
