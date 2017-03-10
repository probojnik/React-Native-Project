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
  Grid,
  Col,
  Radio,
  H1,
  H2,
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

  }

  saveAndEscape(){
    util.saveAndEscape(this.state, SCENES.RegisterSeller, () => {
      this.props._handleNavigate(SCENES.RegisterSeller, this.props.route.data)
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
          <Card style={GlobStyle.card}>
            <H2>1. How do we pay you?</H2>
            <View style={styles.listItem}>
              <Text>PAYPAL</Text>
              <Radio selected={true} />
            </View>
            <InputGroup borderType='rounded' >
              <Icon name='paypal' style={{color:'#384850'}}/>
              <Input
                onChangeText={(val) => this.setState({'note': val})}
                defaultValue='KRISTIN.MCCLEMENT@GMAIL.COM'/>
            </InputGroup>
            <Text>
              Don't have Paypal account? Set one up{' '}
              <Text style={styles.link} onPress={() => util.goToURL('https://www.paypal.com/')}>
                here
              </Text>
              {' '}it's free!
            </Text>
            <Text>
              Or, we can mail you a check instead:
            </Text>
            <View style={styles.listItem}>
              <Text style={{fontWeight: 'bold'}}>Mail check to:</Text>
              <Radio selected={false} />
            </View>
            <View style={{'alignItems': 'flex-end'}}>
              <InputGroup borderType='regular' style={{'width': 250}}>
                <Input
                  defaultValue='Kristin McClement'/>
              </InputGroup>
            </View>
          </Card>
          <Card style={GlobStyle.card}>
            <H2>2. What is the pickup address for your cool kid gear ☺️</H2>
            <View style={{'alignItems': 'flex-end'}}>
              <InputGroup borderType='regular' style={{'width': 250}}>
                <Input
                  multiline={true}
                  style={{'height': 70}}
                  defaultValue='3523 Bryant Street Denver, CO 80211'/>
              </InputGroup>
            </View>
          </Card>
          <Button block onPress={() => this.saveAndEscape()}> Continue </Button>
        </Content>
      </Container>
    );
  }
}
