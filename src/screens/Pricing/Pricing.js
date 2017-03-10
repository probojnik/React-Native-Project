// S_6a
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
  H3,
  Icon,
} from 'native-base';
import styles from './styles';
import { Images, Colors, nbTheme, GlobStyle } from '../../../Themes';
// import { update, find, findAll } from '../../model/db';
import * as util from '../../util/Utils'
import Client from '../../api/client';
import { SCENES, ROUTE as routeTo } from '../../constants/Scenes'

export default class Pricing extends Component {
  constructor(props) {
    super(props);
    console.log('props', props)
    // findAll()
    // try {
    //   if(!this.props.route.data._id) this.props.route.data._id = "zELOcowTuswd39LM" // TEST
    // } catch ( er ) {
    //   console.warn("catch", er.message );
    // } finally {
    //   this.props.route.data = { _id: "zELOcowTuswd39LM" } // TEST
    // }
  }

  componentDidMount(){
    this.initState()
  }

  initState() {
    const deliveryCharge = 0

    this.state = {
      'RetailPrice': 0,
      'PostedPrice': 0,
      'deliveryCharge': deliveryCharge,
      avatarSource: this.props.route.data.avatarSource,
    }

    find(this.props.route.data._id, (queryRes) => {
      if(queryRes != undefined) {
        this.setState({
          'RetailPrice': queryRes[0]['RetailPrice'],
          'PostedPrice': queryRes[0]['PostedPrice'],
        })
        this.updateYouMake()
      } else {
        console.warn('queryRes', queryRes);
      }
    })
  }

  saveAndEscape(){
    util.saveAndEscape(this.state, SCENES.Pricing, () => {
      util.isLoggedIn(({loggedIn}) => {
        this.props._handleNavigate(SCENES.Pricing, this.props.route.data, {loggedIn: loggedIn})
      })
    })
  }

  updateYouMake(postedPrice) {
    if(postedPrice) this.state['PostedPrice'] = postedPrice

    const youMake = .8 * this.state['PostedPrice'] - this.state.deliveryCharge
    this.setState({'youMake': youMake})
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
                <Image style={{ resizeMode: 'cover', width: null }} source={this.state && this.state.avatarSource ? this.state.avatarSource : Images.test_big_ico} />
            </CardItem>
            <CardItem style={[GlobStyle.cardItem, {'flexDirection': 'column'}]}>
              <Grid>
                <Col>
                  <H3>Retail Price</H3>
                </Col>
                <Col >
                  <Text style={{alignSelf: 'flex-end'}}>${this.state && this.state.RetailPrice ? this.state.RetailPrice : 'Nan'}</Text>
                </Col>
              </Grid>
            </CardItem>
            <CardItem style={GlobStyle.cardItem}>
              <Grid>
                <Col>
                  <H3>Posted Price</H3>
                </Col>
                <Col style={{alignItems: 'flex-end'}}>
                  <InputGroup borderType='regular' style={{'width': 70}}>
                    <Text>$</Text>
                    <Input
                      defaultValue = {util.usdPrefix(this.state && this.state.PostedPrice ? this.state.PostedPrice : 'Nan', true)}
                      onChangeText={(val) => this.updateYouMake(util.usdPrefix(val, false))}
                      style={{'width': 70, textAlign: 'right'}}/>
                  </InputGroup>
                </Col>
              </Grid>
            </CardItem>
            <CardItem>
              <Grid>
                <Col>
                  <H3>Delivery surcharge</H3>
                </Col>
                <Col>
                  <Text style={{alignSelf: 'flex-end'}}>${this.state && this.state.deliveryCharge ? this.state.deliveryCharge : 'Nan'}</Text>
                </Col>
              </Grid>
            </CardItem>
            <CardItem style={GlobStyle.cardItem}>
              <Grid>
                <Col>
                  <H3>You make</H3>
                </Col>
                <Col >
                  <Text style={{alignSelf: 'flex-end'}}>${this.state && this.state.youMake ? this.state.youMake : 'Nan'}</Text>
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
