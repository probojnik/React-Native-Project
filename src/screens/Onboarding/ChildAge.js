// L_4
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  DatePickerIOS,
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
  H2,
  Spinner,
  Icon,
  Footer,
  FooterTab,
} from 'native-base'
import { Images, nbTheme, GlobStyle as style } from '../../../Themes'
import { getAgeGroup } from '../../util/Utils'
import { ID } from '../../constants/Const'
import { SCENES } from '../../constants/Scenes'
import { Profile, Amazon, Helper } from '../../model';
import Realm from 'realm'
import _ from 'lodash'

export default class ChildAge extends Component {
  static defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  }

  state = {
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
  }

  constructor(props){
    super(props)
    // console.log('ChildAge', props.route)
  }

  onDateChange(val){
    this.setState({date: val, ageGroup: getAgeGroup(val)})
  }

  nextScene(){
    if(this.state.ageGroup) {
      if(!this.props.route.data) this.props.route.data = {_id: "Nf4F0U8DExQ7dulm"} // test

      Profile.updateChildAge(this.props.route.data._id, this.state.date, (err, data) => {

        this.props._handleNavigate(SCENES.ChildAge, this.props.route.data)
      })
    } else {
      Alert.alert('Inappropriate date', 'Pls select another date!')
    }
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
          <H2 style={style.textCenter}>How old is the child you are shopping for today?</H2>
          <Text style={style.textCenter}>What is your child's birthday so we can recommend age appopriate gear</Text>
          <DatePickerIOS
            date={this.state.date}
            mode="date"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={(val) => this.onDateChange(val)}
          />
          {/* <View style={style.centerHorizontal}>
            <Button block style={[style.vip, style.greyB]} onPress={() => this.nextScene(false)}>Cancel</Button>
            <Button block style={style.vip} onPress={() => this.nextScene(true)}>Next</Button>
          </View> */}
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
