import React, { PropTypes } from 'react';
import { View, Animated, Easing } from 'react-native';
import CircularProgress from './CircularProgress';

const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chartFillAnimation: new Animated.Value(props.prefill || 0)
    }
  }

  componentDidMount() {
    this.animateFill();
      this.state.chartFillAnimation.addListener((val) => {
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animateFill();
    }
  }

  animateFill() {
    const { tension, friction } = this.props;

    Animated.spring(
      this.state.chartFillAnimation,
      {
        toValue: this.props.fill,
        tension,
        friction
      }
    ).start();
  }

  performLinearAnimation(toValue, duration) {
    this.state.chartFillAnimation.setValue(0)
    Animated.timing(
      this.state.chartFillAnimation,
      {
        easing: Easing.linear,
        toValue: toValue,
        duration: duration
      }
    ).start(this.props.callBack);
  }

  stop(){
    this.anim.stop()
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return (
      <AnimatedProgress
        {...other}
        fill={this.state.chartFillAnimation}
        />
    )
  }
}

AnimatedCircularProgress.propTypes = {
  style: View.propTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number,
  prefill: PropTypes.number,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  tension: PropTypes.number,
  friction: PropTypes.number,
  callBack: React.PropTypes.func,
}

AnimatedCircularProgress.defaultProps = {
  tension: 7,
  friction: 10
};
