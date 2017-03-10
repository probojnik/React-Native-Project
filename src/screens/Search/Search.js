// H_0b
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  RefreshControl,
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
  List,
  ListItem,
  CheckBox,
  Button as NBButton,
} from 'native-base'
import { Images, nbTheme, Colors, GlobStyle as style } from '../../../Themes'
import { SCENES } from '../../constants/Scenes'
import { Profile } from '../../model';
import { AppAPI } from '../../api';
import { getAgeGroup } from '../../util/Utils'
import StarsVote from '../../components/StarsVote'
import Picker, { DateModal, DatePickers, DatePickerHead } from 'react-native-modal-date-picker'
import moment from 'moment'

export default class Search extends Component {
  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  }

  state = {
    refreshing: false,
    currentPage: 1,
    cardItems: [1,2,3],
    checkBox: {},
    searchValue: '',
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
  }

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.state.cardItems = this.props.route.data.cardItems
  }

  cardItem(key, value){
    const image = value.OriginalImages && value.OriginalImages.length ?
                  {url: value.OriginalImages[0].URL} :
                  Images.chair_test
    return(
      <CardItem
        style={{flex: 1, flexDirection: 'row'}}
        key={value.ShopifyProductID ? value.ShopifyProductID : key}>
        <View>
          <Image
            style={{width: 80, height: 80, resizeMode: 'contain'}}
            source={image}/>
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
            rating={5}
            starColor={Colors.gold}/>
          <Text style={{position: 'absolute', top: 22, right: 0}}>
            FREE delivery
          </Text>
        </View>
      </CardItem>
    )
  }

  fillCard() {
    console.log('fillCard', this.state.cardItems);
    return this.state.cardItems.map((item, i) => this.cardItem(i, item))
  }

  onRefresh() {
    this.setState({refreshing: true})
    AppAPI.products.get( {page: ++this.state.currentPage} )
      .then((res) => {
        const arr = Array.from(res.data)
        const cardItems = [...this.state.cardItems, ...arr]
        console.log('onRefresh', cardItems, this.state.cardItems, arr);

        this.setState({cardItems, refreshing: false})
      })

    // setTimeout(() => {
    //     this.setState({refreshing: false})
    //   }, 1500)
  }

  render() {
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
          scrollEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              title="Loading new set of products"
            />
          } >

          <Card>
            <CardItem>
              <View style={[style.centerHorizontal, {justifyContent: 'space-between'}]}>
                <View style={[style.centerHorizontal]}>
                  <Image
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                    source={Images.plus}/>
                  <Text>
                    Customize my{'/n'}
                    shopping experience
                  </Text>
                </View>
                <View style={[style.centerHorizontal]}>
                  <Text>
                    Filter
                  </Text>
                  <Image
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                    source={Images.sandwichMenu}/>
                </View>
              </View>
            </CardItem>
            {this.fillCard()}
          </Card>
        </Content>
      </Container>
    )
  }
}
