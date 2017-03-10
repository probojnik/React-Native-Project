// S_5
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
} from 'native-base';
import { Images, Colors, nbTheme, GlobStyle as styles } from '../../../Themes';
import { SCENES, ROUTE as routeTo } from '../../constants/Scenes'

export default class Options extends Component {
  constructor(props) {
    super(props);
  }

  saveAndEscape(param){
    this.props._handleNavigate(SCENES.Options, this.props.route.data, param)
  }

  fillList() {
    if(!this.props.route.data) {
      console.warn('The necessary data is not available')
      return
    }
    items = this.props.route.data.amazon
    return items.map((item, i) => {
      item.title1 = item.name
      item.oldPrice = item.price
      return(
        <CardItem style={styles.cardItem} key={i}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Image
                source={{uri: item.img}}
                resizeMode={Image.resizeMode.contain}
                style={{height:180, width:180}}/>
              <Text style={{width:180}}>
                {item.title1}
              </Text>
              <Text>
                {item.title2}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.grey, {textDecorationLine: 'line-through'}]}>
                  {item.oldPrice}
                </Text>
                <Text style={item.oldPrice ? styles.red : styles.blue}>
                  {item.price}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end'}}>
              <Button onPress={() => this.saveAndEscape(true)}>That's it! (or it’s pretty darn close)</Button>
            </View>
          </View>
        </CardItem>
      )
    })
  }

  render() {

    return (
      <Container style={styles.container}>
        <Header backgroundColor={Colors.mainColor}>
          <Button transparent onPress={() => this.props._handleNavigate({type: 'back'})}>
              <Icon style={{'color': 'white'}} name='ios-arrow-back' />
          </Button>
          <Title style={{'color': 'white'}}>{this.props.route.title}</Title>
          <Button transparent>
            <Text style={{'color': 'white'}}>Cancel</Text>
          </Button>
        </Header>
        <Content theme={nbTheme} style={styles.content}>
          <Card style={styles.card}>
            <CardItem style={styles.cardItem}>
              <H2 style={styles.grey}>Please select the item you are selling:</H2>
            </CardItem>
            {this.fillList()}
            <CardItem style={styles.cardItem}>
              <Button block onPress={() => this.saveAndEscape(false)}> Nope, none of these </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
