//S_3
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Slider,
  CameraRoll
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
  Icon
} from 'native-base';
import styles from './styles';
import { Images, nbTheme, Colors, GlobStyle } from '../../../Themes';
import { Utils as util } from '../../util'
import { Const, Scenes } from '../../constants'
// import { insert, findAll } from '../../model/db';
import { Product } from '../../model'

const { condition } = Const
const { SCENES, ROUTE } = Scenes

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');

export default class CreatePost extends Component {
  componentDidMount() {
    this.showPicker()
  }

  showPicker() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
      }
    })
  }

  saveAndEscape() {
    console.log('this.state', this.state)
    util.saveAndEscape(this.state, SCENES.CreatePost, () => {
      Product.insertCreatePost(this.state, (id) => {
        console.log('avatarSource', this.state.avatarSource);
        this.props._handleNavigate(SCENES.CreatePost, // this.constructor.name
                                    {_id: id, avatarSource: this.state.avatarSource, brand: this.state.brand})
      })
    })
  }

  measureView(event, name) {
    // console.log(name, 'width: ', event.nativeEvent.layout.width)
  }

  render() {
    // console.log('this.props → ', this.props)
    let image
    if(this.state && this.state.avatarSource) {
      image = (<Image style={{ resizeMode: 'cover', width: null }} source={this.state.avatarSource} />)
    } else {
      image = (<View style={{height:250, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 40, color: 'white'}}>+ add photo(s)</Text></View>)
    }
    return (
      <Container onLayout={(event) => this.measureView(event, 'Container')} style={[GlobStyle.container]}>
        <Header backgroundColor={Colors.mainColor}>
          <Button transparent onPress={() => this.props._handleNavigate({type: 'back'})}>
              <Icon style={{'color': 'white'}} name='ios-arrow-back' />
          </Button>
          <Title style={{'color': 'white'}}>{this.props.route.title}</Title>
          <Button transparent>
            <Text style={{'color': 'white'}}>Cancel</Text>
          </Button>
        </Header>
        <Content onLayout={(event) => this.measureView(event, 'Content')} theme={nbTheme} style={[GlobStyle.content]}>
          <Card style={{ flex: 0 }} style={GlobStyle.card}>
            <CardItem style={GlobStyle.cardItem} onPress={this.showPicker.bind(this)}>
               {image}
            </CardItem>
            <CardItem style={[GlobStyle.cardItem ]}>
              <Slider
                onLayout={(event) => this.measureView(event, 'Slider')}
                style={styles.slider}
                step={1}
                minimumValue={0}
                maximumValue={3}
                value={0}
                onValueChange={(val) => this.setState({slider: val})}
                />
              <Grid onLayout={(event) => this.measureView(event, 'Grid')}>
                  <Col onLayout={(event) => this.measureView(event, 'first')} style={[styles.col]}>
                    <Text>{condition[0]}</Text>
                  </Col>
                  <Col onLayout={(event) => this.measureView(event, 'second')} style={[styles.col]}>
                    <Text>{condition[1]}</Text>
                  </Col>
                  <Col onLayout={(event) => this.measureView(event, 'third')} style={[styles.col]}>
                    <Text>{condition[2]}</Text>
                  </Col>
                  <Col onLayout={(event) => this.measureView(event, 'fourth')} style={[styles.col]}>
                    <Text>{condition[3]}</Text>
                  </Col>
              </Grid>
            </CardItem>
            <CardItem style={GlobStyle.cardItem} >
              <H3>
                Brand + Description of Gear
              </H3>
              <InputGroup borderType='regular' >
                <Input
                  onChangeText={(val) => this.setState({'brand': val})}
                  placeholder='(e.g. Fisher Price Tool Set)'/>
              </InputGroup>
            </CardItem>
            <CardItem style={GlobStyle.cardItem} >
              <H3>
                Personal Note:
              </H3>
              <InputGroup borderType='regular' >
                  <Input
                    onChangeText={(val) => this.setState({'note': val})}
                    multiline={true}
                    style={{'height': 50}}
                    placeholder='Make your Item appealing to other parents by providing a helpful tidbit on the item ☺️'/>
              </InputGroup>
            </CardItem>
            <CardItem style={GlobStyle.cardItem} >
              <View style={styles.table}>
                <Button style={styles.column} bordered>+ add another photo**</Button>
                <Button style={styles.column} bordered>+ add more photos</Button>
                <Button style={styles.column} bordered>+ add video (if helpfull)</Button>
              </View>
            </CardItem>
            <CardItem style={GlobStyle.cardItem} >
              <H3>
                Age Appropriate for this gear?
              </H3>
              <InputGroup borderType='regular' >
                <Input
                  onChangeText={(val) => this.setState({'age': val})}
                  placeholder='DROP DOWN - Toddler'/>
              </InputGroup>
            </CardItem>
            <CardItem style={GlobStyle.cardItem} >
              <H3>
                Select top 3 aisles where you could find the gear:
              </H3>
              <InputGroup borderType='regular' >
                <Input
                  onChangeText={(val) => this.setState({'aisles': val})}
                  placeholder='Click boxes (dynamic list based on age)'/>
              </InputGroup>
            </CardItem>
          </Card>
          <Button block onPress={() => this.saveAndEscape()}> Continue </Button>
        </Content>
      </Container>
    );
  }
}
