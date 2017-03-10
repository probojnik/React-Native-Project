import { Enum } from '../util'

export const PRODUCT = Enum (
  "userID",
  "availability",
  "condition",
  "createDate",
  "description",
  "originalDescription",
  "originalImages",
  "originalPrice",
  "originalUrl",
  "price",
  "productAgeRange",
  "productName",
  "productTags",
  "sellerID",
  "shopifyProductID",
)
export const ORIGINAL_IMAGES = Enum (
  "caption",
  "primary",
  "url",
)
export const PRODUCT_AGE_RANGE = Enum (
  "name",
)

export const PROFILE = Enum (
  "FBuserID",
  "name",
  "email",
  "location",
  "first_name",
  "last_name",
  "gender",
  "verified",
  "picture",
  "hasBuyerProfile",
  "child",
)
export const CHILD = Enum (
  "name",
  "age",
  "gender",
  "tag",
)
export const TAG = Enum (
  "name",
)

export const AMAZON = Enum(
  "name1",
  "email1",
)
