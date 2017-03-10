import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { Container, Content, Button } from 'native-base';


const About = ({_goBack}) => (
    <Container>
      <Content style={styles.container}>
        <Text style={styles.title}>About</Text>
        <Button onPress={_goBack}>
            Go Back
        </Button>
      </Content>
    </Container>
)

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 22,
    textAlign: 'center'
  },
  container: {
    paddingTop: 60
  }
})

export default About
