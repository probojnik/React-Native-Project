'use strict'

import realm from './Realm'
import UUID from 'react-native-uuid'
import _ from 'lodash'
import { TABLE, SCHEMA } from './Schema'
import { ID } from '../constants/Const'

var instance;
export function getRealm(){
  // if ( !instance ) {
    // instance = require('./Realm')
  // }
  return realm;
}

export function injectUUID(data) {
  _.forEach(data, function(value, key) {
    if(key === ID && value === null){
      data[ID] = UUID.v1()
    } else if(value !== null && typeof value === 'object') {
      injectUUID(value)
    }
  })
  // if (ID in data && data[ID] == null) {
  //   data[ID] = UUID.v1()
  // }
}

export function insert(data, table=TABLE.Profile, callback=function(){}) { // C
  injectUUID(data)
  try {
    getRealm().write(function(){
      let result = getRealm().create(table.s(), data) // RealmObject
      console.log(`Helper.js insert ${table.s()}`, data, result)
      callback.call(this, result)
    })
  } catch(e) {
    console.warn(`Helper.js insert ${table.s()}`, e, data)
    // getRealm().close()
  }
}

export function query(query, table=TABLE.Profile, callback=function(){}) { // R
  try {
    getRealm().write(function() {
      let result = getRealm().objects(table.s())
      if(query!==null && query.length) {
        const query0 = query[0]
        result = result.filtered(`${query0.table} = '${query0.value}' `) // Object // AND ${nested.path}.${nested.table} = '${nested.value}'
      }
      let nestedFiltered = [] //
      if(query!==null && query.length > 1) {
        const query1 = query[1]
        let index = 0
        for(const item of result) { // RealmObject
          nestedFiltered[index++] = {[query1.path]: item[query1.path].filtered(`${query1.table} = '${query1.value}'`)}
        }
      }
      console.log(`Helper.js query ${table.s()}`, query, result, nestedFiltered, result.length)
      if(result.length) {
        callback.call(this, result, nestedFiltered) // Realm.Results
      }
    })
  } catch(e) {
    console.warn(`Helper.js query ${table.s()}`, e, query)
    // getRealm().close()
  }
}

export function queryOne(query, table=TABLE.Profile, callback=function(){}) { // R
  try {
    getRealm().write(function() {
      let result = getRealm().objectForPrimaryKey(table.s(), query[0].value) // RealmObject
      let nestedFiltered = null
      if(query.length > 1) {
        const query1 = query[1]
        nestedFiltered = result[query1.path] // List
        nestedFiltered = nestedFiltered.filtered(`${query1.table} = '${query1.value}'`) // Results
        if(nestedFiltered.length && nestedFiltered[0]){
          nestedFiltered = nestedFiltered[0] // RealmObject
        } else {
          nestedFiltered = null
          console.warn(`Helper.js queryOne ${table.s()}`, 'nestedFiltered error', query)
        }
      }
      console.log(`Helper.js queryOne ${table.s()}`, query, result, nestedFiltered)
      if(result) {
        callback.call(this, result, nestedFiltered) // RealmObject, RealmObject
      }
    })
  } catch(e) {
    console.warn(`Helper.js queryOne ${table.s()}`, e, query)
  }
}

export function update(data, table=TABLE.Profile, callback=function(){}) { // U
  try {
    getRealm().write(function() {
      let result = []
      if(data.constructor === Array) {
        for(const item of result) {
          const res = getRealm().create(table.s(), data, true)
          result.push(res)
        }
      } else if(data.constructor === Object) {
        result = getRealm().create(table.s(), data, true)
      }
      console.log(`Helper.js update ${table.s()}`, data, result)
      callback.call(this, result)
    })
  } catch(e) {
    console.warn(`Helper.js update ${table.s()} error`, e, data)
  }
}

export function del(query, table=TABLE.Profile, callback=function(){}) { // D
  let items = item.items;
  getRealm().write(function(){
    let result = getRealm().objects(table.s()).filtered(query)
    getRealm().delete(result)
    console.log(`Helper.js delete ${table.s()}`, query, result)
    callback.call(this, result)
  })
}
