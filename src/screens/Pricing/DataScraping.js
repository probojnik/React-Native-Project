// S_4
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Slider,
  CameraRoll,
} from 'react-native'
import {
  Container,
  Content,
  Header,
  Title,
  Card,
  CardItem,
  Thumbnail,
  Button,
  InputGroup,
  Input,
  Grid,
  Col,
  H3,
  H1,
  Icon,
} from 'native-base';
import { Images, Colors, nbTheme, GlobStyle as style } from '../../../Themes'
import Countdown from '../../components/AnimatedTimer/Countdown'
import { SCENES } from '../../constants/Scenes'
import Client from '../../api/client'
// import { insert, find, findAll } from '../../model/db';

export default class DataScraping extends Component {
  constructor(props) {
    super(props)
    findAll()
  }

  componentDidMount(){
    new Client('tokenExample').fetchAmazonProducts(this.props.route.data.brand, result => {
      this.props.route.data['amazon'] = result
      this.props._handleNavigate( SCENES.DataScraping, this.props.route.data )
    })
  }

  render() {
    return (
      <View style={[style.root, style.containerColumnCenter]}>
          <Text style={[style.grey, style.marginVertical]}>Hang tight, while we work our magic</Text>
          <Countdown
            style={style.marginVertical}
            secs = {60}
            shift = {10}
            size = {280}
            img1={Images.avatar_circle}/>
          <Text style={[style.grey, style.marginVertical]}>Processing...</Text>
      </View>
      )
    }
  }
