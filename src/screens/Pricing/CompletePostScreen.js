// S_8
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native'
import {
  Container,
  Content,
  Header,
  Title,
  Card,
  CardItem,
  Icon,
  Button,
  H2,
  H3,
} from 'native-base';
import { Images, Colors, nbTheme, GlobStyle as styles } from '../../../Themes';
import { SCENES, ROUTE as routeTo } from '../../constants/Scenes'

export default class CompletePostScreen extends Component {

  saveAndEscape(param){
    this.props._handleNavigate(SCENES.CompletePostScreen, this.props.route.data, param)
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header backgroundColor={Colors.mainColor}>
          <Title style={{'color': 'white'}}>{this.props.route.title}</Title>
        </Header>
        <Content theme={nbTheme} style={styles.content}>
          <Card style={styles.card}>
            <CardItem style={styles.cardItem}>
              <H2 style={styles.grey}>
                Congratulations! {'\n'}
                Your gear is live and cross-posted for increased visibility!
              </H2>
            </CardItem>
            <CardItem style={[styles.cardItem, {flexDirection: 'row', justifyContent: 'space-between'}]}>
              <Image
                source={Images.avatar_circle}
                resizeMode={Image.resizeMode.contain}
                style={{height:180, width:180}}/>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <H2>
                  Alligator Push Toy
                </H2>
              </View>
            </CardItem>
            <CardItem style={[styles.cardItem, {marginTop: 130}]}>
              <Button block onPress={() => this.saveAndEscape(true)}> Add Another Listing </Button>
            </CardItem>
            <CardItem style={styles.cardItem}>
              <Button block onPress={() => this.saveAndEscape(false)}> Continue Shipping </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
