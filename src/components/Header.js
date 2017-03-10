import React, { Component } from 'react';
import {
  Container,
  Header as NBHeader,
  InputGroup,
  Input,
  Icon,
  Thumbnail,
  Button,
  View
} from 'native-base';
import {
  Image
} from 'react-native'
import { Images } from '../../Themes';

import styles from './Styles/Header';

export default (props) => (
    <NBHeader searchBar rounded>
      <InputGroup>
        <Icon name="ios-search" />
        <Input placeholder="Search" />
      </InputGroup>
      <Button transparent onPress={props.onPress}>
        <Image
          style={{width: 140, resizeMode: 'contain'}}
          source={Images.logoText} />
      </Button>
    </NBHeader>
)
