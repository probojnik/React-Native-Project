// H_1
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Button,
} from 'react-native'
import {
  Container,
  Content,
  Header,
  Title,
  Card,
  CardItem,
  H3,
  InputGroup,
  Input,
  Icon,
  Button as NBButton,
} from 'native-base'
import { Images, nbTheme, Colors, GlobStyle as style } from '../../../Themes'
import { Scenes, Tab, Const } from '../../constants'
import { Product } from '../../model'
import { AppAPI } from '../../api';
import { getAgeGroup, reConvertCondition, calculateDelivery } from '../../util/Utils'
import StarsVote from '../../components/StarsVote'

const { SCENES } = Scenes
const { TAB } = Tab
const { USER_ID } = Const

export default class ShowCuratedProduct extends Component {
  state = {
    items: [],
    location: [0, 0],
    searchValue: '',
  }
  constructor(props){
    super(props)
    // Product.query(null, null)
    console.log('ShowCuratedProduct', props);
  }
  watchID: ?number = null;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition (
      (position) => {
        this.setLocation(position)
        this.showCurated()
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setLocation(position)
      this.forceUpdate()
    })
  }

  setLocation(location) {
    var result = [location.coords.longitude, location.coords.latitude]
    // console.log('setLocation', location, result);
    this.state.location = result
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  showCurated() {
    const p = {customerID: "HOrkN9gxSviOYAD0dBlloQ=="} // , childID: "4196803a-d2f7-4637-91f3-47092d78f36d"
    AppAPI.curatedProducts.get(p)
      .then((response) => {
        console.log('showCurated', response);
        let structure = []
        for(const product of response.data) {
          structure.push(Product.getStructureFromAPI(product))
        }
        Product.update(structure)

        this.state.items = Array.from(response.data)
        this.forceUpdate()
      })
  }

  nextStage(res){
    this.props._handleNavigate(SCENES.ShowCuratedProduct, {...this.props.route.data, res: res})
  }

  clickSearch() {
    AppAPI.products.get({ age: 0, focus: this.state.searchValue || 'Transformer2' }) // Transformer2
      .then((res) => {
        // this.nextStage(Array.from(res))
      })
  }

  clickItem(id) {
    this.props.changeTab(TAB.Checkout, {'_id': id})
  }

  /*
  Availability:true
  Condition:"Gently Loved"
  CreateDate:"2017-01-31T13:00:44.370Z"
  Description:"This fantastic toy is the one your child needs!"
  MetroArea:"Colorado Springs"
  OriginalDescription:"This is where the brilliant text from the original site would be."
  OriginalImages:Array[0]
  OriginalPrice:30
  OriginalUrl:"http://amazon.com/productdetailhere"
  Price:15
  ProductAgeRange:Array[1]
    0:"Infant"
  ProductName:"Pygmalian Kazzoo31-6"
  ProductTags:Array[2]
    0:"Transformer2"
    1:"Boy2"
  SellerID:"QuYF2yFCRXynbcJs4D8ekw=="
  ShopifyProductID:"8067370251"
  ZipCode:"80904"
  */
  item(key, value) {
    return(
      <CardItem
        style={{flex: 1, flexDirection: 'row'}}
        onPress={() => this.clickItem(value['_id'])}
        key={value['_id']}>
        <View>
          <Image
            style={{width: 80, height: 80, resizeMode: 'contain'}}
            source={Images.chair_test}/>
          <Button
            onPress={() => {}}
            title={value.Price ? String(value.Price) : 'Price'}
            color="#841584"/>
        </View>
        <View
          style={{flex: 1}}>
          <H3
            numberOfLines={1}
            ellipsizeMode='clip'>{value.Description || 'Description'}</H3>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 20, height: 20, resizeMode: 'contain'}}
              source={Images.avatar_circle}/>
            <Text>by Jane D</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>Focus:</Text>
            <Text>{value.ProductTags ? value.ProductTags.join(',') : ''}</Text>
          </View>
          <StarsVote
            starSize={14}
            disabled={true}
            maxStars={5}
            rating={reConvertCondition(value.Condition)}
            starColor={Colors.gold}/>
          <Text style={{position: 'absolute', top: 22, right: 0}}>
            {calculateDelivery(this.state.location)}
          </Text>
        </View>
      </CardItem>
    )
  }

  fillList() {
    return this.state.items.map((item, i) => this.item(i, item))
  }

  render() {
    // console.log('render', this.state.location)
    return (
      <Container style={style.container}>
        <Header searchBar rounded>
          <InputGroup>
            <Icon name="ios-search" />
            <Input
              onChangeText={val => this.setState({searchValue: val})}
              value={this.state.searchValue}
              placeholder="Search" />
          </InputGroup>
          <NBButton transparent onPress={() => this.clickSearch()}>
            <Image
              style={{width: 140, resizeMode: 'contain'}}
              source={Images.logoText} />
          </NBButton>
        </Header>
        <Content
          theme={nbTheme}
          style={style.content}
          scrollEnabled={true}>
          <Card>
            {this.fillList()}
          </Card>
        </Content>
      </Container>
    )
  }
}
