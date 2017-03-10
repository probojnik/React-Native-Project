import React, {
  Component,
  PropTypes,
} from 'react'
import {
  View,
  Text,
} from 'react-native'
import { GlobStyle as style } from '../../../Themes'
import { convertCondition } from '../../util/Utils'

import Star from './item';

export default class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxStars: this.props.maxStars,
      rating: Math.round(this.props.rating),
    }

    this.onStarButtonPress = this.onStarButtonPress.bind(this)
  }

  onStarButtonPress(rating) {
    this.props.selectedStar(rating)
    this.setState({
      rating: Math.round(rating),
    })
  }

  round(number) {
    return (Math.round(number * 2) / 2);
  }

  render() {
    let starsLeft = this.round(this.props.rating);
    let starButtons = [];

    for (let i = 0; i < this.state.maxStars; i++) {
      let starIconName = this.props.emptyStar;
      let starColor = this.props.emptyStarColor;

      if (starsLeft >= 1) {
        starIconName = this.props.fullStar;
        starColor = this.props.starColor;
      } else if (starsLeft === 0.5) {
        starIconName = this.props.halfStar;
        starColor = this.props.starColor;
      }

      starButtons.push(
        <Star
          activeOpacity={0.20}
          disabled={this.props.disabled}
          key={i}
          rating={i + 1}
          onStarButtonPress={this.onStarButtonPress}
          iconSet={this.props.iconSet}
          starSize={this.props.starSize}
          starIconName={starIconName}
          starColor={starColor}
        />
      );
      starsLeft--;
    }

    return (
      <View style={style.starsVoteContainer}>
        <View style={style.starsContainer}>
          {starButtons}
        </View>
        <Text style={style.starsText}>{convertCondition(this.state.rating - 1)}</Text>
      </View>
    );
  }
}

Vote.propTypes = {
  disabled: PropTypes.bool,
  emptyStar: PropTypes.string,
  fullStar: PropTypes.string,
  halfStar: PropTypes.string,
  iconSet: PropTypes.string,
  maxStars: PropTypes.number,
  rating: PropTypes.number,
  selectedStar: PropTypes.func,
  starColor: PropTypes.string,
  emptyStarColor: PropTypes.string,
  starSize: PropTypes.number,
};

Vote.defaultProps = {
  disabled: false,
  emptyStar: 'star-o',
  fullStar: 'star',
  halfStar: 'star-half-o',
  iconSet: 'FontAwesome',
  maxStars: 5,
  rating: 0,
  starColor: 'black',
  emptyStarColor: 'gray',
  starSize: 40,
};
