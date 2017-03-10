import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Slider,
  CameraRoll
} from 'react-native'
import {
  Container,
  Content,
  Header,
  Title,
  Card,
  CardItem,
  Button,
  InputGroup,
  Input,
  Grid,
  Col,
  H2,
  Icon} from 'native-base';
import styles from './styles';
import { Images, nbTheme, Colors,GlobStyle } from '../../../Themes';
// import { insert, update } from '../../model/db';
import * as util from '../../util/Utils'
import { SCENES, ROUTE as routeTo } from '../../constants/Scenes'

export default class MoreInfo extends Component {
  constructor(props) {
    super(props);
    console.log('constructor', props)
    this.state = {'RetailPrice': '5.00', 'PostedPrice': '1.00'}
  }

  saveAndEscape(){
    util.saveAndEscape(this.state, SCENES.MoreInfo, () => {
      update(this.state, this.props.route.data._id, () => {
        this.props._handleNavigate( SCENES.MoreInfo, this.props.route.data )
      })
    })
  }

  render() {
    return (
      <Container style={GlobStyle.container}>
        <Header backgroundColor={Colors.mainColor}>
          <Button transparent onPress={() => this.props._handleNavigate({type: 'back'})}>
              <Icon style={{'color': 'white'}} name='ios-arrow-back' />
          </Button>
          <Title style={{'color': 'white'}}>{this.props.route.title}</Title>
          <Button transparent>
            <Text style={{'color': 'white'}}>Cancel</Text>
          </Button>
        </Header>
        <Content theme={nbTheme} style={GlobStyle.content}>
          <Card style={GlobStyle.card}>
            <CardItem style={GlobStyle.cardItem}>
              <H2>Sorry we could not locate the item you are trying to sell!</H2>
            </CardItem>
            <CardItem style={GlobStyle.cardItem}>
              <H2>Don't worry you can still post it we just need a little more information from you.</H2>
            </CardItem>
            <CardItem style={GlobStyle.cardItem}>
              <H2>Price you think you bought it for:</H2>
              <View style={{'alignItems': 'flex-end'}}>
                <InputGroup borderType='regular' style={{'width': 100}}>
                  <Input
                    onChangeText={(val) => this.setState({'RetailPrice': util.usdPrefix(val, false)})}
                    defaultValue={util.usdPrefix(this.state.RetailPrice, true)}
                    style={{'width': 100}} />
                </InputGroup>
              </View>
            </CardItem>
            <CardItem style={GlobStyle.cardItem}>
              <H2>Price you want to sell it for:</H2>
              <View style={{'alignItems': 'flex-end'}}>
                <InputGroup borderType='regular' style={{'width': 100}}>
                  <Input
                    onChangeText={(val) => this.setState({'PostedPrice': util.usdPrefix(val, false)})}
                    defaultValue={util.usdPrefix(this.state.PostedPrice, true)}
                    style={{'width': 100}} />
                </InputGroup>
              </View>
            </CardItem>
            <CardItem style={GlobStyle.cardItem}>
              <H2>*Link to original item:</H2>
              <InputGroup borderType='regular' >
                <Input
                  onChangeText={(val) => this.setState({'link': val})}
                  placeholder='http://google.com'/>
              </InputGroup>
            </CardItem>
            <CardItem style={GlobStyle.cardItem}>
              <H2>*Additional description:</H2>
              <InputGroup borderType='regular' >
                <Input
                  onChangeText={(val) => this.setState({'additionalDesc': val})}
                  placeholder='(e.g. Fisher Price Tool Set)'/>
              </InputGroup>
            </CardItem>
            <CardItem style={GlobStyle.cardItem}>
              <H2>Additional photos/videos:</H2>
              <Grid>
                  <Col>
                    <Button style={{'height': 70}} block bordered>+ add another photo**</Button>
                  </Col>
                  <Col>
                    <Button style={{'height': 70}} block bordered>+ add more photos</Button>
                  </Col>
                  <Col>
                    <Button style={{'height': 70}} block bordered>+ add video (if helpfull)</Button>
                  </Col>
              </Grid>
            </CardItem>
          </Card>
          <Button block onPress={() => this.saveAndEscape()}> Continue </Button>
        </Content>
      </Container>
    );
  }
}
