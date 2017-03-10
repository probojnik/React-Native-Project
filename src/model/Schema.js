import Realm from 'realm'
import { Utils, Enum } from '../util'
import { Const, DBColumn } from '../constants'
const { ID } = Const
const { PRODUCT, ORIGINAL_IMAGES, PRODUCT_AGE_RANGE, PROFILE, CHILD, TAG, AMAZON } = DBColumn

import RealmModel from './RealmModel'

export const TABLE = Enum("Product", "OriginalImage", "ProductAgeRange", "Profile", "Child", "Tag", "Amazon")

export const DEFAULT_CHILD_NAME = 'noname'

class Product extends RealmModel { } // for sell
Product.schema = {
  name: TABLE.Product.s(),
  primaryKey: ID,
  properties: {
    [ID]:                               'string',
    [PRODUCT.userID.s()]:               'string',
    [PRODUCT.availability.s()]:         'bool',
    [PRODUCT.condition.s()]:            'string',
    [PRODUCT.createDate.s()]:           'date',
    [PRODUCT.description.s()]:          'string',
    [PRODUCT.originalDescription.s()]:  'string',
    [PRODUCT.originalImages.s()]:       {type: 'list', objectType: TABLE.OriginalImage.s()},
    [PRODUCT.originalPrice.s()]:        'int',
    [PRODUCT.originalUrl.s()]:          'string',
    [PRODUCT.price.s()]:                'int',
    [PRODUCT.productAgeRange.s()]:      {type: 'list', objectType: TABLE.ProductAgeRange.s()},
    [PRODUCT.productName.s()]:          'string',
    [PRODUCT.productTags.s()]:          {type: 'list', objectType: TABLE.Tag.s()},
    [PRODUCT.sellerID.s()]:             'string',
    [PRODUCT.shopifyProductID.s()]:     'string',
  }
}

class OriginalImage extends RealmModel {}
OriginalImage.schema = {
  name: TABLE.OriginalImage.s(),
  properties: {
      [ORIGINAL_IMAGES.caption.s()]:    'string',
      [ORIGINAL_IMAGES.primary.s()]:    'bool',
      [ORIGINAL_IMAGES.url.s()]:        'string',
  },
}

class ProductAgeRange extends RealmModel {}
ProductAgeRange.schema = {
  name: TABLE.ProductAgeRange.s(),
  properties: {
      [PRODUCT_AGE_RANGE.name.s()]: 'string',
  },
}

class Profile extends RealmModel {}
Profile.schema = {
  name: TABLE.Profile.s(),
  primaryKey: ID,
  properties: {
    [ID]:                           'string',
    [PROFILE.FBuserID.s()]:         'string',
    [PROFILE.name.s()]:             'string',
    [PROFILE.email.s()]:            'string',
    [PROFILE.location.s()]:         'string',
    [PROFILE.first_name.s()]:       'string',
    [PROFILE.last_name.s()]:        'string',
    [PROFILE.gender.s()]:           'bool',
    [PROFILE.verified.s()]:         'bool',
    [PROFILE.picture.s()]:          'string',
    [PROFILE.hasBuyerProfile.s()]:  'bool',
    [PROFILE.child.s()]:            {type: 'list', objectType: TABLE.Child.s()},
  }
}

class Child extends RealmModel {}
Child.schema = {
  name: TABLE.Child.s(),
  // primaryKey: CHILD.name.s(),
  properties: {
      [CHILD.name.s()]:           {type: 'string', default: DEFAULT_CHILD_NAME},
      [CHILD.age.s()]:            'int',
      [CHILD.gender.s()]:         'bool',
      [CHILD.tag.s()]:            {type: 'list', objectType: TABLE.Tag.s()},
  },
}

class Tag extends RealmModel {}
Tag.schema = {
  name: TABLE.Tag.s(),
  // primaryKey: TAG.name.s(),
  properties: {
      [TAG.name.s()]:       'string',
  },
}

class Amazon extends RealmModel {}
Amazon.schema = {
  name: TABLE.Amazon.s(),
  primaryKey: ID,
  properties: {
    [ID]: 'string',
    [AMAZON.name1.s()]:       'string',
    [AMAZON.email1.s()]:      'string',
  },
}

export default { Product, OriginalImage, ProductAgeRange, Profile, Child, Tag, Amazon }
