import {
  Alert,
  Linking,
} from 'react-native'
import _ from 'lodash'
import moment from 'moment'
import { AccessToken } from 'react-native-fbsdk'
import turfDistance from '@turf/distance'

import { formKeys, condition } from '../constants/Const'
import { SCENES, ROUTE as routeTo } from '../constants/Scenes'

export function distanceBetween(first, second=[50, 30]) { // [longitude, latitude]
  var point1 = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": first
    }
  }
  var point2 = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": second
    }
  }
  var units = "kilometers" // degrees, radians, miles, or kilometers
  var points = {
    "type": "FeatureCollection",
    "features": [point1, point2]
  }
  var res = turfDistance(point1, point2, units);
  res = Math.round(res)
  // console.log('distance', res, first, second)
  return res
}

export function calculateDelivery(first, second) {
  const distance = distanceBetween(first, second)
  if(distance < 100) return 'Free Delivery' // Zone 1
  if(distance < 1000) return '$5 Delivery' // Zone 2
  if(distance < 10000) return '$10 Delivery' // Zone 3
  if(distance < 100000) return '$15 Delivery' // Zone 4
}

export function saveAndEscape(state, screenName, func) {
  var warn = checkAllFilled(state, screenName)
  if (warn != null) {
    Alert.alert('Doesnt filling the field', warn )
  } else {
    func()
  }
}

function checkAllFilled(state, screenName): string {
  console.log('Utils.js checkAllFilled', state, screenName)
  const keys = formKeys[screenName]
  if(state == null){
    return keys[0]
  }
  for(var key of keys) {
    if(state[key] === undefined) {
      return key
    }
  }
  return null
}

export function usdPrefix(val, addOrDelete = true){
  val = _.trim(val)
  if(addOrDelete){
    return val.charAt(0) === '$' ? val : '$' + val
  } else {
    return val.charAt(0) === '$' ? val.slice(1) : val
  }
}

export function convertCondition(num){
  if ( num in condition ) {
    return condition[num]
  } else {
    return 'other'
  }
}
export function reConvertCondition(value) {
  const res = _.findIndex(condition, function(v) {
  	return v === value
  })
  return res >= 0 ? res+1 : 5
}

export function goToURL(url) {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url)
    } else {
      console.log('Don\'t know how to open URI: ' + url)
    }
  });
}


export function getAge(dateOfBirth){
  return moment().diff(dateOfBirth, 'years')
}

export function getAgeGroup(dateOfBirth){
  const age = getAge(dateOfBirth)
  if(age < 1) return "infant"
  if(age <= 3) return "toodler"
  if(age <= 5) return "preschool"
  if(age <= 12) return "grade school"
  return null
}

export function isLoggedIn(callback) {
  AccessToken.getCurrentAccessToken()
    .then(res => {
      const result = {isLogged: res != null, ...res}
      console.log('my isLoggedIn', res, result)
      callback.call(this, result)
    })
}

export function symb(s){
  const str = s.toString()
  return str.slice(7, -1)
}

export function getProductsRequestBody({slider=0,
                                        brand='brand Name',
                                        note='default note',
                                        age='dafault age',
                                        aisles='dafault aisles',
                                        avatarSource,
                                        RetailPrice=12,
                                        PostedPrice=12,
                                        link='http://',
                                        additionalDesc='default additionalDesc',
                                        youMake=12} = {}) {
  let result = {}
  result.SellerID = '48725a6b-8a2c-0ea9-c85f-d823a35fe28a'
  result.ProductName = brand
  result.Description = note
  result.Condition = convertCondition(slider)
  result.Availability = true
  result.Price = PostedPrice
  result.CreateDate = moment().format().toString()

  result.OriginalUrl = link
  result.OriginalDescription = additionalDesc
  result.OriginalPrice = youMake
  result.OriginalImages = []

  result.ProductAgeRange = []
  result.ProductTags = []
  // console.log('getProductsRequestBody', result)

  return result

 // "OriginalImages": [
 //   {
 //     "URL": "http://amazon.com/productimagehere.jpg",
 //     "Caption": "blah, blah, blah",
 //     "Primary": true
 //   },
 //   {
 //     "URL": "http://amazon.com/productimagehere.jpg",
 //     "Caption": "blah, blah, blah",
 //     "Primary": false
 //   }
 // ],
 // "ProductAgeRange": [
 //   "Infant",
 //   "Toddler"
 //   ],
 // "ProductTags": [
 //   "Girl",
 //   "Boy",
 //   "Pretend Play"
 // ]


}
