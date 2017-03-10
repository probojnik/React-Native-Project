// L_7
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'
import {
  Container,
  Content,
  Card,
  CardItem,
  Button,
  H3,
  Icon,
  Footer,
  FooterTab,
} from 'native-base'
import { Images, nbTheme, GlobStyle as style } from '../../../Themes'
import { SCENES } from '../../constants/Scenes'

export default class LocationPrompt extends Component {
  nextScene(){
    this.props._handleNavigate(SCENES.LocationPrompt, this.props.route.data)
  }

  render() {
    return (
      <Container style={style.container}>
        <Content
          theme={nbTheme}
          style={style.content}
          contentContainerStyle={StyleSheet.flatten([style.contentColumnCenter])}
          scrollEnabled={false}>
          <View style={style.contentColumnRight}>
            <Image
              source={Images.logoText}
              resizeMode={Image.resizeMode.contain}
              style={{width: 200, height: 80}}/>
          </View>
          <Card style={style.card}>
            <CardItem style={style.cardItem}>
              <H3>Last Step!</H3>
            </CardItem>
            <CardItem style={style.cardItem}>
              <H3>We need your location to determine your local comunity marketpalce.</H3>
            </CardItem>
            <CardItem style={style.cardItem}>
              <H3>Allow Good Buy Gear to determine your location automatically?</H3>
            </CardItem>
            <CardItem style={style.cardItem}>
              <H3>(Note this should be the location where you would want gear delivered)</H3>
            </CardItem>
          </Card>

        </Content>
        <Footer>
          <FooterTab>
            <Button block onPress={() => this.nextScene(false)}> Cancel </Button>
            <Button block onPress={() => this.nextScene(true)}> Next </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
