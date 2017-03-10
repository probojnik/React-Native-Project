import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Alert,
} from 'react-native'
import {
  Container,
  Content,
  Header,
  Title,
  Card,
  CardItem,
  Button,
  H3,
  Icon,
} from 'native-base';
import SvgUri from 'react-native-svg-uri';

import { Images, Colors, nbTheme, GlobStyle as style } from '../../../Themes'
import * as util from '../../util/Utils'
import { Profile } from '../../model';
import { Const, Scenes } from '../../constants'

const { SCENES } = Scenes
const { USER_ID } = Const

export default class WelcomeScreen extends Component {
  state = {
    name: 'Linda',
    isBuyerOrSeller: true, //props && props.isBuyerOrSeller ? props.isBuyerOrSeller : true,
    imgUrl: Images.avatar_circle,
  }

  componentDidMount() {
    if(!this.props.route.data) this.props.route.data = {_id: USER_ID} // test

    Profile.queryOne(this.props.route.data._id, null, (result, nested) => {
      console.log('WelcomeScreen. queryOne', result);
      this.setState({
        name: result.first_name,
        imgUrl: {uri: result.picture}
      })
    })
  }

  nextScene(isContinue){
    this.props._handleNavigate( SCENES.WelcomeScreen, this.props.route.data, { isContinue } )
  }

  render() {
    return (
      <Container style={style.container}>
        <Content
          theme={nbTheme}
          style={[style.content]}
          scrollEnabled={false}>
          <Card style={style.card}>
            <CardItem style={[style.cardItem, style.centerHorizontal, style.marginVertical]}>
              <Image
                source={Images.logoText}
                resizeMode={Image.resizeMode.contain}
                style={{width: 200, height: 80}}/>
            </CardItem>
            <CardItem style={[style.cardItem, style.centerHorizontal, style.marginVertical]}>
              <H3 style={[style.grey, style.textCenter]}>Welcome {this.state.name}! You are now part of an amazing
                comunity of partners who want to spoil their kids responsibility!</H3>
            </CardItem>
            <CardItem style={[style.cardItem, style.centerHorizontal, style.marginVertical]}>
              <Image
                source={this.state.imgUrl}
                resizeMode={Image.resizeMode.contain}
                style={{width: 150, height: 150}}/>
            </CardItem>
            <CardItem style={[style.cardItem, style.centerHorizontal, style.marginVertical]}>
              <H3 style={[style.grey, style.textCenter]}>
                {this.state.isBuyerOrSeller
                  ? 'Please answer a few quick questions so you can enjoy a curated shopping experience!'
                  : 'Please answer a few quick questions we can get your gear listed!'
                }
                </H3>
            </CardItem>
            {this.state.isBuyerOrSeller
              ?
              <CardItem style={[style.cardItem, style.centerHorizontal]}>
                 <Button block style={[style.vip, style.greyB]} onPress={() => this.nextScene(false)}>Not Now</Button>
                 <Button block style={style.vip} onPress={() => this.nextScene(true)}>Continue</Button>
               </CardItem>
              :
              <CardItem style={[style.cardItem]}>
                <Button block onPress={() => this.nextScene(true)}>Continue</Button>
              </CardItem>
            }

          </Card>
        </Content>
      </Container>
    )
  }
}
