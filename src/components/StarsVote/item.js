import React, {
  Component,
  PropTypes,
} from 'react';
import { iconSets } from '../../constants/Const'
import Button from 'react-native-button'

export default class Star extends Component {

  constructor(props) {
    super(props)

    this.onButtonPress = this.onButtonPress.bind(this)
  }

  onButtonPress() {
    this.props.onStarButtonPress(this.props.rating)
  }

  render() {
    const Icon = iconSets[this.props.iconSet]

    return (
      <Button
        activeOpacity={0.20}
        disabled={this.props.disabled}
        onPress={this.onButtonPress}
        style={{
          height: this.props.starSize,
          width: this.props.starSize,
        }}
      >
        <Icon
          name={this.props.starIconName}
          size={this.props.starSize}
          color={this.props.starColor}
        />
      </Button>
    );
  }
}

Button.propTypes = {
  disabled: PropTypes.bool,
  rating: PropTypes.number,
  onStarButtonPress: PropTypes.func,
  iconSet: PropTypes.string,
  starSize: PropTypes.number,
  starIconName: PropTypes.string,
  starColor: PropTypes.string,
};
