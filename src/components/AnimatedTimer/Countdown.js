import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import AnimatedCircularProgress from './AnimatedCircularProgress';
import {Colors, Fonts} from '../../../Themes/';

export default class Countdown extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      points: 1,
    }
    this.containerSize = props.size
    const imgSize = this.containerSize - props.shift * 2
    this.container0Style = StyleSheet.flatten([styles.container0, this.props.style])
    this.container1Style = StyleSheet.flatten([styles.container1, {top: props.shift, left:props.shift}])
    this.imgStyle = StyleSheet.flatten([styles.img, {width: imgSize, height: imgSize}])
  }

  componentDidMount() {
    this.start()
  }

  start() {
    this.refs.circularProgress.performLinearAnimation(100, this.props.secs * 1000);
  };

  render() {
      const fill = this.state.points / this.props.secs * 100;
      console.log('points=' + this.state.points + ', fill=' + fill)

      return (
          <View style={this.container0Style}>
              <AnimatedCircularProgress
                  size={this.containerSize}
                  width={5}
                  ref='circularProgress'
                  callBack={this.props.callBack}
                  fill={fill}
                  rotation={0}
                  tintColor="#22D190"
                  backgroundColor="#F1F1F1">
                  {
                    (fill) => (
                      <View style={this.container1Style}>
                        <Image
                          source={this.props.img1}
                          resizeMode={Image.resizeMode.contain}
                          style={this.imgStyle}/>
                      </View>
                    )
                  }
              </AnimatedCircularProgress>
          </View>
      );
  }
}
Countdown.propTypes = {
  style: React.PropTypes.object.isRequired,
  shift: React.PropTypes.number.isRequired,
  size: React.PropTypes.number.isRequired,
  img1: React.PropTypes.number.isRequired,
  secs: React.PropTypes.number,
  callBack: React.PropTypes.func,
};
Countdown.defaultProps = {
  secs: 60,
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container0: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
  },
  container1: {
      backgroundColor: 'transparent',
      position: 'absolute',
      // top: this.imgShift,
      // left: this.imgShift,
  },
  img: {
      // width: this.containerSize - this.imgShift * 2,
      // height: this.containerSize - this.imgShift * 2,
  },
})
