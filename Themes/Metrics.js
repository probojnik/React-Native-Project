import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Used via Metrics.baseMargin
const metrics = {
  platformOs: Platform.OS,
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarMessengerHeight: 63,
  backNavBarMessengerHeight: 72,
  navBarHeight: 78,
  backNavBarHeight: 104,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    xSmall: 18,
    small: 20,
    medium2: 22,
    medium1: 24,
    medium: 30,
    medium3: 35,
    medium4: 40,
    large: 45,
    xl: 60,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300,
  },
}
metrics.widthOfContent = metrics.screenWidth - metrics.marginHorizontal * 2,


console.log('screenWidth', metrics.screenWidth)
console.log('screenWidthWithMargin', metrics.screenWidthWithMargin)

export default metrics
