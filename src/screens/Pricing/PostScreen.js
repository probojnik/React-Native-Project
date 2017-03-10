// S_7a, PREVIEW,
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
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
  H3,
  Icon,
} from 'native-base';
import styles from './styles';
import * as util from '../../util/Utils'
import { Images, Colors, nbTheme, GlobStyle } from '../../../Themes'
// import { update, find, findAll } from '../../model/db';
import Client from '../../api/client';
import { SCENES, ROUTE as routeTo } from '../../constants/Scenes'
import StarsVote from '../../components/StarsVote'

export default class PostScreen extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount(){
    this.setState({
      starsVote: 4.5,
      avatarSource: this.props.route.data.avatarSource,
    })
  }

  onStarsVotePressed(val) {
    this.setState({
      starsVote: val
    });
  }

  saveAndEscape(){
    util.saveAndEscape(this.state, SCENES.PostScreen, () => {
      update(this.state, this.props.route.data._id, (err, doc) => {
        new Client('tokenExample').createProduct(util.getProductsRequestBody(doc), result => {
          this.props._handleNavigate(SCENES.PostScreen, this.props.route.data)
          Alert.alert('HTTP Response status', result.status.toString() )
        })
      })
    })
  }

  render() {
    return (
      <Container style={GlobStyle.container}>
        <Header backgroundColor={Colors.mainColor}>
          <Button transparent onPress={() => _handleNavigate({type: 'back'})}>
              <Icon style={{'color': 'white'}} name='ios-arrow-back' />
          </Button>
          <Title style={{'color': 'white'}}>{this.props.route.title}</Title>
          <Button transparent>
            <Text style={{'color': 'white'}}>Cancel</Text>
          </Button>
        </Header>
        <Content theme={nbTheme} style={GlobStyle.content}>
          <Card style={GlobStyle.card}>
            <CardItem style={GlobStyle.cardItem}>
                <Image
                  style={{ resizeMode: 'cover', width: null }}
                  source={this.state && this.state.avatarSource ? this.state.avatarSource : Images.test_big_ico} />
            </CardItem>
            <CardItem style={GlobStyle.cardItem}>
              <H3>Meissa & Doug Alligator Push Toy</H3>
              <View style={styles.listItemLeft}>
                <Icon name="guest" style={{ color: '#DD5044' }} />
                <Text style={styles.grey}>by Kristish M.</Text>
              </View>
              <View style={styles.listItemLeft}>
                <Text style={styles.grey}>Focus:</Text>
                <Text>Motor skill development</Text>
              </View>
              <StarsVote
                starSize={14}
                disabled={false}
                maxStars={5}
                rating={this.state && this.state.starsVote ? this.state.starsVote : 0}
                starColor={Colors.gold}
                selectedStar={(val) => this.onStarsVotePressed(val)} />
            </CardItem>
            <CardItem style={[GlobStyle.cardItem, styles.note]}>
              <Text style={styles.bold}>Personal Note:</Text>
              <Text style={styles.grey}>My dauter learned to walk with this push tool. Highly recommended!</Text>
            </CardItem>
          </Card>
          <Button block onPress={() => this.saveAndEscape()}> Post it! </Button>
        </Content>
      </Container>
    );
  }
}
