import { StyleSheet, Dimensions } from 'react-native';
import { Metrics, nbTheme, Colors } from '../../../Themes/';
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  btnOneThird: {
    width: null,
  },
  slider: {
    marginHorizontal: ( Metrics.widthOfContent - nbTheme.listItemPadding * 2 ) / 8 - 15
  },
  col: {
    alignItems: 'center'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  link: {
    color: '#acacac',
    fontWeight: 'bold'
  },
  grey: {
    color: Colors.grey,
  },
  bold: {
    fontWeight: 'bold',
  },
  note: {
    marginHorizontal: 25,
  },
  table: {flexDirection: 'row', justifyContent:'space-between'},
  column: {height: 70, width: 100},

})
