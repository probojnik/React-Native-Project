import EntypoIcons from 'react-native-vector-icons/Entypo'
import EvilIconsIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import FoundationIcons from 'react-native-vector-icons/Foundation'
import IoniconsIcons from 'react-native-vector-icons/Ionicons'
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons'
import OcticonsIcons from 'react-native-vector-icons/Octicons'
import ZocialIcons from 'react-native-vector-icons/Zocial'
import { SCENES } from './Scenes'

export const MAP_DELTA = 0.1

export const USER_ID = 'my_temp_user_id' //it is necessary to receive from server after synchronization

export const formKeys = {
  [SCENES.CreatePost]: ['avatarSource'], //'slider', 'brand', 'note', 'age', 'aisles',
  [SCENES.MoreInfo]: [], // 'RetailPrice', 'PostedPrice', 'link', 'additionalDesc'
  [SCENES.Pricing]: [], // 'PostedPrice'
  [SCENES.RegisterSeller]: [],
  [SCENES.PostScreen]: [],
}

export const condition = [
  'Loved',
  'Gently\nUsed',
  'Barely\nUsed',
  'Brand\nnew'
]

export const iconSets = {
  Entypo: EntypoIcons,
  EvilIcons: EvilIconsIcons,
  FontAwesome: FontAwesomeIcons,
  Foundation: FoundationIcons,
  Ionicons: IoniconsIcons,
  MaterialIcons: MaterialIconsIcons,
  Octicons: OcticonsIcons,
  Zocial: ZocialIcons,
}

export const ID = "_id"
