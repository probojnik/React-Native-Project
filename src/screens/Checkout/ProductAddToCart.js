// B_2
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Slider,
  NativeModules,
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
} from 'native-base'
import { Images, Colors, nbTheme, GlobStyle } from '../../../Themes';
import { Product } from '../../model';
import * as util from '../../util/Utils'
import Client from '../../api/client'
import { SCENES, ROUTE as routeTo } from '../../constants/Scenes'

export default class ProductAddToCart extends Component {
  static defaultProps = {
    shopifyProductID: "8110585163",
    deliveryCharge: 5,
  }

  state = {
    shopifyProductID: this.props.shopifyProductID,
    RetailPrice: 0,
    PostedPrice: 0,
    deliveryCharge: this.props.deliveryCharge,
  }

  constructor(props) {
    super(props)
    console.log('props', props)
  }

  componentDidMount(){
    // this.initState()
    // console.dir(NativeModules.Shopify);
    // NativeModules.Shopify.addEvent("One", "Two", 3, function(o) {
    //     console.log("In Callback")
    //     console.dir(o);
    // })

  }

  initState() {
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

  nextStage(){

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
          <Button block onPress={() => this.nextStage()}> Continue </Button>
        </Content>
      </Container>
    );
  }
}
