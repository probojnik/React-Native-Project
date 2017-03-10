// L_7b
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  InteractionManager,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Footer,
  FooterTab,
  Button,
  Icon,
  InputGroup,
  Input,
} from 'native-base';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';

import { MAP_DELTA } from '../../constants/Const';
import styles from './styles'

export default class Location extends Component {
  state = {
    loading: true,
    searchValue: '',
  }

  componentDidMount() {
    this.focus()
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  nextScene(){
    this.props._handleNavigate(SCENES.LocationPrompt, this.props.route.data)
  }

  clickSearch(){
    this.geocoder(this.state.searchValue)
  }

  geocoder(address){
    Geocoder.geocodeAddress(address).then(res => {
      console.log('geocoder', res);
      if(res.length){
        const posit = res[0]['position']
        this.map.animateToRegion({
          latitude: posit.lat,
          longitude: posit.lng,
          latitudeDelta: MAP_DELTA,
          longitudeDelta: MAP_DELTA,
        }, 200);
      }
    }).catch(err => console.warn('my geocoder', err))
  }

  focus() {
    // console.log('search', this.searchInput._textInput)
    if (this.textInput !== null) {
      this.searchInput._textInput.focus()
    }
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const ratio = width / height;
    const coordinates = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * ratio,
    };

    return (
      <Container>
        <Header searchBar rounded>
          <InputGroup>
            <Icon name="ios-search" />
            <Input
              ref={ref => this.searchInput = ref}
              value={this.state.searchValue}
              onChangeText={val => this.setState({searchValue: val})}
              placeholder="Search" />
          </InputGroup>
          <Button transparent onPress={() => this.clickSearch()}>
            Search
          </Button>
        </Header>
        <View style={styles.container}>
          {this.state.loading ? (
            <Loading />
          ) : (
            <MapView
              ref={(ref) => { this.map = ref; }}
              style={styles.map}
              showsUserLocation={true}
              followsUserLocation={true}
              showsMyLocationButton={true}
              loadingEnabled={true}
              mapType={'standard'}
              // initialRegion={coordinates}
            />
          )}
        </View>

        <Footer>
          <FooterTab>
            <Button block onPress={() => this.nextScene(false)}> Cancel </Button>
            <Button block onPress={() => this.nextScene(true)}> Continue </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

const Loading = () => (
  <View style={styles.container}>
    <Text>Loading...</Text>
  </View>
)
