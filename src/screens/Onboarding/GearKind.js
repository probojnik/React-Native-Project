// L_6
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
  CheckBox,
  List,
  ListItem,
} from 'native-base'
import { Images, nbTheme, GlobStyle as style } from '../../../Themes'
import { SCENES } from '../../constants/Scenes'
import { Profile } from '../../model';
import { getAgeGroup } from '../../util/Utils'

export default class GearKind extends Component {
  state = {
    gender: 'son', // daughter
    checkBox: {},
    items: [
      'Sleeping Gear',
      'Travel Gear',
      'Eating Gear',
      'Safety Gear',
      'Gross Motor Play',
      'Fine Motor Play',
      'Language and Communication',
      'Artistic Expression'
    ],
  }
  constructor(props){
    super(props)
  }

  nextScene(){
    if(!this.props.route.data) this.props.route.data = {_id: "Nf4F0U8DExQ7dulm"} // test

    Profile.updateGearKind(this.props.route.data._id, this.state.checkBox, (err, data) => {
      this.props._handleNavigate(SCENES.GearKind, this.props.route.data)
    })
  }

  fillList(){
    return this.state.items.map((item, i) => {
      return (
        <ListItem key={i}>
            <CheckBox
              onPress={() => {
                this.setState(state => {
                  state.checkBox[item] = !state.checkBox[item]
                })
              }}
              checked={this.state.checkBox[item]} />
            <Text>{item}</Text>
        </ListItem>
      )
    })
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
          <H2 style={style.textCenter}>What kind of gear are you seeking for your {this.state.gender}?</H2>
          <List>
            {this.fillList()}
          </List>
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
