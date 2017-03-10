// L_5
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
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
  Thumbnail,
  Footer,
  FooterTab,
} from 'native-base'
import { Images, Colors, nbTheme, GlobStyle as style } from '../../../Themes'
import { SCENES } from '../../constants/Scenes'
import { Profile } from '../../model';

export default class ChildGender extends Component {
  state = {
    age: 'infant', // infant, toodler, preschool, grade school
    gender: 'son', // daughter
  }

  constructor(props){
    super(props)
  }

  componentDidMount() {
    if(!this.props.route.data) this.props.route.data = {_id: "Nf4F0U8DExQ7dulm"} // test

    Profile.find(this.props.route.data._id, (err, data) => {
      this.setState({
        age: getAgeGroup(data.childAge),
        gender: data.childGender,
      })
    })
  }

  nextScene(){
    if(!this.props.route.data) this.props.route.data = {_id: "Nf4F0U8DExQ7dulm"} // test

    Profile.updateChildGender(this.props.route.data._id, this.state.gender, (err, data) => {
      this.props._handleNavigate(SCENES.ChildGender, this.props.route.data)
    })
  }

  getImgAge(gender){
    switch (this.state.age) {
      case 'infant':
        return gender == 'son' ? Images.infant_boy : Images.infant_girl
      case 'toodler':
        return gender == 'son' ? Images.toddler_boy : Images.toddler_girl
      case 'preschool':
        return gender == 'son' ? Images.preschool_boy : Images.preschool_girl
      case 'grade school':
        return gender == 'son' ? Images.grade_school_boy : Images.grade_school_girl
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
          <H2 style={style.textCenter}>Is the toddler you are shopping for a boy or girl?</H2>
          <View style={style.centerHorizontal}>
            <TouchableWithoutFeedback onPress={() => {this.setState({gender: 'son'})}}>
              <Thumbnail
                square
                size={100}
                style={this.state.gender != 'son' ? {tintColor: Colors.grey} : {}}
                source={this.getImgAge('son')} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {this.setState({gender: 'daughter'})}}>
              <Thumbnail
                square
                size={100}
                style={this.state.gender != 'daughter' ? {tintColor: Colors.grey} : {}}
                source={this.getImgAge('daughter')} />
            </TouchableWithoutFeedback>
          </View>
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
