import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import {
  Container,
  Content,
  Spinner,
  H1,
} from 'native-base';

import { nbTheme, GlobStyle } from '../../../Themes';
import { Scenes, Const } from '../../constants'
import { Utils } from '../../util'
import { Profile } from '../../model'

const { USER_ID } = Const
const { SCENES } = Scenes

export default class Splash extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount(){
    Utils.isLoggedIn(res => this.nextScene(res))
  }

  nextScene(res) {
    const { isLogged } = res
    if( isLogged ) {
      const { userID } = res
      Profile.updateFBid(userID, USER_ID, (data) => {
        if(this.props.route.data === undefined) {
          this.props.route.data = {}
        }
        this.props.route.data._id = data._id
        this.props._handleNavigate(SCENES.Splash, this.props.route.data, isLogged)
      })
    } else {
      this.props._handleNavigate(SCENES.Splash, this.props.route.data, isLogged)
    }
  }

  render() {
    return (
      <Container style={GlobStyle.container}>
        <Content
          theme={nbTheme}
          style={GlobStyle.content}
          contentContainerStyle={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
          scrollEnabled={false}>
          <H1>Splash Screen</H1>
          <Spinner />
        </Content>
      </Container>
    )
  }
}
