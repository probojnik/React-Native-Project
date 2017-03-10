import { Platform, Dimensions } from 'react-native';
import Metrics from './Metrics';
import Colors from './Colors';

const { height, width } = Dimensions.get('window');

module.exports = {
  root:{
    backgroundColor: 'white',
    flex: 1,
    paddingTop: (Platform.OS === 'ios' ) ? 17 : 0,
  },
  container:{
    backgroundColor: 'white',
  },
  content:{
    backgroundColor: 'white',
    marginHorizontal: Metrics.marginHorizontal,
    marginBottom: 30,
    borderWidth: 0,
  },
  card: {
    borderWidth: 0,
  },
  cardItem: {
    borderColor: 'white',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  starsVoteContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  starsText: {
    color: Colors.grey,
    marginLeft: 12,
  },
  icon: {
    margin: 30,
    fontSize: 7,
  },
  grey: {
    color: Colors.grey,
  },
  greyB: {
    backgroundColor: Colors.grey,
  },
  red: {
    color: Colors.red,
  },
  blue: {
    color: Colors.blue,
  },
  centerHorizontal: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerColumnCenter: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentColumnCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contentColumnRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  containerRowCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vip: {
    flexGrow: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  marginVertical: {
    marginVertical: Metrics.marginVertical,
  }
}
