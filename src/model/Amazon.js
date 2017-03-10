import { Utils, Enum } from '../util'
import { ID } from '../constants/Const'
import { Helper, Schema } from './index'



export function insert(data, callback) { // C
  // console.log('insert', data);
  Helper.insert(data, Schema.TABLE.Amazon, callback)
}

export function query(query, callback) { // R
  Helper.query(query, Schema.TABLE.Amazon, callback)
}

export function update(data, callback) { // R
  Helper.update(data, Schema.TABLE.Amazon, callback)
}
