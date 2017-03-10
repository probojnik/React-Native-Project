//Login / Register
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native'
import {
  Container,
  Content,
  Header,
  Title,
  Card,
  CardItem,
  Button,
  H3,
  Spinner,
  Icon,
} from 'native-base';
import SvgUri from 'react-native-svg-uri';
import { LoginButton, LoginManager,  GraphRequest, GraphRequestManager, } from 'react-native-fbsdk'

import { Images, Colors, nbTheme, GlobStyle as style } from '../../../Themes'
import * as util from '../../util/Utils'
import { Const, Scenes } from '../../constants'
import { Profile } from '../../model';

const { SCENES } = Scenes
const { iconSets, USER_ID } = Const
const { Zocial } = iconSets

export default class OAuthLogin extends Component {
  constructor(props){
    super(props)
    this.state = {process: false}
  }

  componentDidMount(){
    // this.requestGraph()
  }

  nextScene(_id) {
    if(this.props.route.data === undefined) {
      this.props.route.data = {}
    }
    this.props.route.data._id = _id
    this.props._handleNavigate(SCENES.OAuthLogin, this.props.route.data, false)
  }

  // 1 STAGE
  facebookLogin(){
    return (
      <View>
        <LoginButton
          style={{height: 40, width: 205,}}
          publishPermissions = {['publish_actions']}
          readPermissions = {['email', 'user_location']}
          onLoginFinished = {
            (error, result) => {
              if (error) {
                this.fbError(1, result)
              } else if (result.isCancelled) {
                this.fbCancelled(1, result)
              } else {
                this.fbSuccess(1, result)
              }
            }
          }
          onLogoutFinished={() => this.fbLogout()}/>
      </View>
    )
  }

  // 2 STAGE
  facebookRequestAdditionalPermissions() {
    this.setState({process: true})
    LoginManager.logInWithReadPermissions(['email', 'user_location'])
      .then(result => {
        if (result.isCancelled) {
          this.fbCancelled(2, result)
        } else {
          this.fbSuccess(2, result)
        }
      },
      error => {
        this.fbError(2, error)
      })
  }

  // 3 STAGE
  requestGraph(){
    var fields = [
      'id',
      'name',
      'email',
      'location',
      'first_name',
      'last_name',
      'gender',
      'verified',
      'picture.type(large)',
    ]

    if (fields.length) {
      const infoRequest = new GraphRequest(
        '/me',
        {
          parameters: {
            fields: {
              string: fields.join(',')
            }
          }
        },
        (error: ?Object, result: ?Object) => {
          if (error) {
            this.fbError(3, error)
          } else {
            this.fbSuccess(3, result)
          }
        },
      )

      this.setState({process: true})
      new GraphRequestManager().addRequest(infoRequest).start()
    }
  }

  // callbacks
  fbSuccess(stage, res) {
    this.setState({process: false})
    // console.log("fbSuccess", `stage #${stage}`, res)

    switch (stage) {
      // case 1:
      // // {"isCancelled":false,"grantedPermissions":["email","user_location","contact_email","publish_actions","public_profile"],"declinedPermissions":[]}
      //   this.facebookRequestAdditionalPermissions()
      //   break
      case 1:
      // {"isCancelled":false,"grantedPermissions":["email","user_location"],"declinedPermissions":[]}
        this.requestGraph()
        break
      case 3:
      // {"location":{"id":"111227078906045","name":"Kyiv, Ukraine"},"gender":"male","id":"10207993665429972","last_name":"Shamzhy","verified":true,"email":"probojnik@gmail.com","picture":{"data":{"is_silhouette":false,"url":"https://scontent.xx.fbcdn.net/v/t1.0-1/1970748_10201383930710735_1540048418_n.jpg?oh=5b2a686957ed63292766b6654510e768&oe=591F6807"}},"name":"Stanislav Shamzhy","first_name":"Stanislav"}
        const data = {
          FBuserID: res.id,
          name: res.name,
          email: res.email,
          location: res.location.name,
          first_name: res.first_name,
          last_name: res.last_name,
          gender: res.gender,
          verified: res.verified,
          picture: res.picture.data.url
        }
        Profile.updateFBGraph(data, USER_ID, (res) => {
          try {
            this.nextScene(res._id)
          } catch (e) {
            console.warn(`updateFBGraph`, e, res)
          }
        })
        break
    }
  }
  fbError(stage, res){
    this.setState({process: false})
    console.log("fbError", `stage #${stage}`, res)
  }
  fbCancelled(stage, res){
    this.setState({process: false})
    console.log("fbCancelled", `stage #${stage}`, res)
  }
  fbLogout(){
    console.log("User logged out")
  }

  render() {
    return (
      <Container style={style.container}>
        <Content
          theme={nbTheme}
          style={[style.content]}
          contentContainerStyle={{flexDirection: 'column', alignItems: 'flex-end'}}
          scrollEnabled={false}>
          <SvgUri width="200" height="200" source={Images.logoTextSVG} />
          <H3>Please login / {"\n"}register to continue:</H3>
          {this.facebookLogin()}
          <Button
            onPress={() => {}}
            style={{backgroundColor: Colors.amazon, alignSelf: 'flex-end', marginTop: 5, width: 205}} >
              <Icon name='amazon' />
              Login with Amazon
          </Button>
          <Text style={[style.grey, {marginTop: 5}]}>More options</Text>
          <Text style={[style.grey, {marginTop: 35, textAlign: 'right'}]}>Why do I{"\n"}need to do{"\n"}this?</Text>
          {
            this.state.process
            ? <Spinner style={{position: 'absolute'}}/>
            : null
          }
        </Content>
      </Container>
    )
  }
}
