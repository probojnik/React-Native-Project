import { Const, DBColumn } from '../constants'
import { TABLE } from './Schema'
import * as Helper from './Helper'
import _ from 'lodash'
const { ID } = Const
const { PRODUCT, ORIGINAL_IMAGES, PRODUCT_AGE_RANGE, TAG } = DBColumn

/*
data= {userID,availability,condition,createDate,description,originalDescription,originalImages,originalPrice,originalUrl,
      price,productAgeRange,productName,productTags,sellerID,shopifyProductID}
originalImages= [{caption, primary, url}, ] -- Array
productAgeRange= [{name}, ] -- Array
tag= [{name}, ] -- Array
*/
function parseStructure({data, originalImages, productAgeRange, tags}) {
  // console.log('parseStructure',
  //   data,
  //   originalImages,
  //   productAgeRange,
  //   tags,
  //   PRODUCT)

  let result = _.cloneDeep(data)
  if(originalImages) {
    result[PRODUCT.originalImages.s()] = originalImages
  }
  if(productAgeRange) {
    result[PRODUCT.productAgeRange.s()] = productAgeRange
  }
  if(tags) {
    result[PRODUCT.productTags.s()] = tags
  }

  if (!_.has(result, ID)) {
    result[ID] = null
  }

  return result
}

export function getStructureFromAPI(product) {
  // console.log('getStructureFromAPI', product)
  const {_id, Availability, Condition, CreateDate, Description, OriginalDescription, OriginalImages, OriginalPrice,
    OriginalUrl, Price, ProductAgeRange, ProductName, ProductTags, SellerID, ShopifyProductID} = product

  let data = {
    [ID]:                               _id,
    [PRODUCT.userID.s()]:               null,
    [PRODUCT.availability.s()]:         Availability,
    [PRODUCT.condition.s()]:            Condition,
    [PRODUCT.createDate.s()]:           CreateDate,
    [PRODUCT.description.s()]:          Description,
    [PRODUCT.originalDescription.s()]:  OriginalDescription,
    [PRODUCT.originalPrice.s()]:        OriginalPrice,
    [PRODUCT.originalUrl.s()]:          OriginalUrl,
    [PRODUCT.price.s()]:                Price,
    [PRODUCT.productName.s()]:          ProductName,
    [PRODUCT.sellerID.s()]:             SellerID,
    [PRODUCT.shopifyProductID.s()]:     ShopifyProductID,
  }

  let originalImages = []
  for(const image of OriginalImages) {
    const {Caption, Primary, URL} = image
    originalImages.push({
      [ORIGINAL_IMAGES.caption.s()]:  Caption,
      [ORIGINAL_IMAGES.primary.s()]:  Primary,
      [ORIGINAL_IMAGES.url.s()]:      URL
    })
  }

  let productAgeRange = []
  for(const ageRange of ProductAgeRange) {
    productAgeRange.push({
      [PRODUCT_AGE_RANGE.name.s()]: ageRange
    })
  }

  let tags = []
  for(const tag of ProductTags) {
    tags.push({
      [TAG.name.s()]:  tag
    })
  }

  return {data, originalImages, productAgeRange, tags}
}

export function update(structure, callback) {
  let data = []
  if(data.constructor === Array) {
    for(const item of structure) {
      data.push(parseStructure(item))
    }
  } else if(data.constructor === Object) {
    data = parseStructure(structure)
  }

  Helper.update(data, TABLE.Product, callback)
}

export function insertCreatePost(state, callback) {
  const { avatarSource = null,
          slider = 0,
          brand = 'empty',
          note = 'empty',
          age = 'empty',
          aisles = 'empty' } = state

  const data = {
    [ID]: null, 
  }

  Helper.update(data, TABLE.Product, callback)
}

export function query(query, callback) {
  Helper.query(query, TABLE.Product, function(result, nestedFiltered) {
    console.log(TABLE.Product, result.length, 'is EMPTY')
    // for (var profileVal of result) {
    //   console.log('Product', profileVal, profileVal[ID], profileVal[PRODUCT.description.s()] )
    // }
    if(callback) callback.call(this, result, nestedFiltered)
  })
}
