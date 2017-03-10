// S_7a seller PROFILE
import React, { Component } from 'react'
import {
  View,
  Text,
  Linking,
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
  Picker,
  Item,
  Grid,
  Col,
  Radio,
  H1,
  H2,
  H3,
  Icon,
} from 'native-base';
import styles from './styles';
import * as util from '../../util/Utils'
import { Images, Colors, nbTheme, GlobStyle } from '../../../Themes';
// import { update, find, findAll } from '../../model/db';
import Client from '../../api/client';
import { SCENES, ROUTE as routeTo } from '../../constants/Scenes'

export default class RegisterSeller extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedPicker: 'key0',
    }
  }

  saveAndEscape(){
    util.saveAndEscape(this.state, SCENES.RegisterSeller, () => {
      this.props._handleNavigate(SCENES.RegisterSeller, this.props.route.data)
    })
  }

  onPickerValueChange (value: string) {
    this.setState({
        selected1 : value
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
          <H1>Now the important stuff!</H1>
          <Card style={[GlobStyle.card]}>
            <CardItem style={GlobStyle.cardItem} >
              <H2>1. How do we pay you?</H2>
              <Text>Please select one:</Text>
              <View style={{marginLeft: 25}}>
                <View style={styles.listItem}>
                  <H3>PAYPAL</H3>
                  <Radio selected={true} />
                </View>
                <InputGroup borderType='rounded' >
                  <Icon name='paypal' style={{color:'#384850'}}/>
                  <Input
                    onChangeText={(val) => this.setState({'note': val})}
                    defaultValue='KRISTIN.MCCLEMENT@GMAIL.COM'/>
                </InputGroup>
                <View style={[styles.listItem, {marginTop: 14}]}>
                  <H3>Good Buy Bucks*</H3>
                  <Radio selected={false} />
                </View>
                <View style={[styles.listItem, {marginTop: 14}]}>
                  <H3>Mail me a check</H3>
                  <Radio selected={false} />
                </View>
              </View>
            </CardItem>
            <CardItem style={GlobStyle.cardItem} >
              <H2>2. What is your adress for pickup?</H2>
              <View style={{marginLeft: 25, marginTop: 14}}>
                <InputGroup borderType='regular' >
                  <Input
                    onChangeText={(val) => {}}
                    placeholder='Name'/>
                </InputGroup>
                <InputGroup borderType='regular' >
                  <Input
                    onChangeText={(val) => {}}
                    placeholder='Street'/>
                </InputGroup>
                <InputGroup borderType='regular' >
                  <Input
                    onChangeText={(val) => {}}
                    placeholder='Street'/>
                </InputGroup>
                <InputGroup borderType='regular' >
                  <Input
                    onChangeText={(val) => {}}
                    placeholder='City'/>
                </InputGroup>
                <Grid>
                  <Col >
                    <Picker
                      iosHeader="Select State"
                      mode="dropdown"
                      selectedValue="key0"
                      selectedValue={this.state.selectedPicker}
                      onValueChange={this.onPickerValueChange.bind(this)}>
                          <Item label="State" value="key0" />
                          <Item label="1" value="key1" />
                          <Item label="2" value="key2" />
                          <Item label="3" value="key3" />
                     </Picker>
                  </Col>
                  <Col >
                    <InputGroup borderType='regular' >
                      <Input
                        onChangeText={(val) => {}}
                        placeholder='Zip'/>
                    </InputGroup>
                  </Col>
                </Grid>
                <InputGroup borderType='regular' >
                  <Input
                    onChangeText={(val) => {}}
                    placeholder='United States'/>
                </InputGroup>
              </View>
            </CardItem>
          </Card>
          <Button block onPress={() => this.saveAndEscape()}> Continue </Button>
        </Content>
      </Container>
    )
  }
}
