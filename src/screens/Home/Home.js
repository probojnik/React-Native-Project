import React from 'react'
import {
  View,
  Text
} from 'react-native'
import { Container, Content, Badge, Header as NBHeader, Title } from 'native-base';
import styles from './styles';

import Header from '../../components/Header'

const routeToAbout = {
  type: 'push',
  route: {
    key: 'about',
    title: 'About'
  }
}

const Home = ({_handleNavigate, testIdrntificator}) => (
  <Container>
    <Content style={styles.container}>
      <Header onPress={_handleNavigate !== undefined ? () => _handleNavigate(routeToAbout) : null} testIdrntificator={testIdrntificator}/>

      <Badge style={{margin: 100}}>{testIdrntificator}</Badge>
    </Content>
  </Container>)

export default Home
