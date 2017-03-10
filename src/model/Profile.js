import { Const, DBColumn } from '../constants'
import { TABLE, DEFAULT_CHILD_NAME } from './Schema'
import * as Helper from './Helper'
import _ from 'lodash'
const { ID } = Const
const { PROFILE, CHILD, TAG } = DBColumn

/*
data= {FBuserID, name, email, location, first_name, last_name, gender, verified, picture, hasBuyerProfile}
child= [{name, age, gender}, ] -- Array
tag= [[{name}, ], [{name}, ], ] -- Two-Dimensional Array
*/
function parseStructure({data, childs, tags}) {
  console.log('parseStructure', data, childs, tags)
  let result = _.cloneDeep(data);
  if(childs) {
    if(tags) {
      for(let index in childs) {
        childs[index][CHILD.tag.s()] = tags[index]
      }
    }
    result[PROFILE.child.s()] = childs
  }

  // result hasn't ID key
  if (!_.has(result, ID)) {
    result[ID] = null
  }

  return result
}

export function insert(structure, callback){
  const data = parseStructure(structure)
  Helper.insert(data, TABLE.Profile, callback)
}

export function update(structure, id, callback, needParse=true) { // doesnt work with nested tables
  console.log('update', structure, id);

  let data = needParse ? parseStructure(structure) : structure
  _.merge(data, {[ID]: id})
  Helper.update(data, TABLE.Profile, callback)
}

export function query(parentID=null, childName=null, callback) { // doesnt work filter for nested tables
  const query = []
  if(parentID) {
    query.push({
      path: 'root',
      table: ID,
      value: parentID,
    })
  }
  if(childName) {
    query.push({
      path: PROFILE.child.s(),
      table: CHILD.name.s(),
      value: childName,
    })
  }

  Helper.query(query, TABLE.Profile, function(result, nestedFiltered) {
    console.log(TABLE.Profile, result.length)
    for (var profileVal of result) {
      console.log('Profile', profileVal, profileVal[ID], profileVal[PROFILE.name.s()] )
      let childs = profileVal[PROFILE.child.s()] //.filtered(` ${CHILD.name.s()} = 'nino'`)
      for (const childVal of childs) {
        console.log(PROFILE.child.s(), childVal, childVal[CHILD.name.s()] )
        for (const tagVal of childVal[CHILD.tag.s()]) {
          console.log(CHILD.tag.s(), tagVal, tagVal[TAG.name.s()] )
        }
      }
    }
    if(callback) callback.call(this, result, nestedFiltered)
  })
}

export function queryOne(parentID, childName, callback) {
  const query = []
  query.push({
    path: 'root',
    table: ID,
    value: parentID,
  })
  if(childName) {
    query.push({
      path: PROFILE.child.s(),
      table: CHILD.name.s(),
      value: childName,
    })
  }
  Helper.queryOne(query, TABLE.Profile, callback)
}

export function updateFBid(FBuserID, _id, func) { // for Splash
  const data = {[PROFILE.FBuserID.s()]: FBuserID}
  update(data, _id, func, false)
}

export function updateFBGraph({FBuserID, name, email, location, first_name, last_name,
                              gender, verified, picture}, _id, callback) { // for OAuthLogin
  const data = {
    [PROFILE.FBuserID.s()]: FBuserID,
    [PROFILE.name.s()]: name,
    [PROFILE.email.s()]: email,
    [PROFILE.location.s()]: location,
    [PROFILE.first_name.s()]: first_name,
    [PROFILE.last_name.s()]: last_name,
    [PROFILE.gender.s()]: gender === 'male',
    [PROFILE.verified.s()]: verified,
    [PROFILE.picture.s()]: picture,
    [PROFILE.hasBuyerProfile.s()]: false,
  }

  console.log('updateFBGraph', data, _id)
  update(data, _id, callback, false)
}

export function updateChildAge(parentID, childName=DEFAULT_CHILD_NAME, childAge, callback) { // ChildAge
  const query = [{
    path: 'root',
    table: ID,
    value: parentID,
  }, {
    path: PROFILE.child.s(),
    table: CHILD.name.s(),
    value: childName,
  }]

  Helper.queryOne(query, TABLE.Profile, function(result, nestedFiltered) {
    nestedFiltered[CHILD.age.s()] = childAge
  })
}

export function updateChildGender(parentID, childName=DEFAULT_CHILD_NAME, childGender, callback) { // ChildGender
  const query = [{
    path: 'root',
    table: ID,
    value: parentID,
  }, {
    path: PROFILE.child.s(),
    table: CHILD.name.s(),
    value: childName,
  }]

  Helper.queryOne(query, TABLE.Profile, function(result, nestedFiltered) {
    nestedFiltered[CHILD.gender.s()] = childGender
  })
}

export function updateChildTag(parentID, childName=DEFAULT_CHILD_NAME, tags, callback) { // GearKind
  const query = [{
    path: 'root',
    table: ID,
    value: parentID,
  }, {
    path: PROFILE.child.s(),
    table: CHILD.name.s(),
    value: childName,
  }]

  Helper.queryOne(query, TABLE.Profile, function(result, nestedFiltered) {
    nestedFiltered[CHILD.tag.s()] = tags
  })
}

export function setTestData() {
  insert(getTestStructure())
}

export function testData(realm) {
  let data;
  try {
    data = parseStructure(getTestStructure())
    Helper.injectUUID(data)
    const res = realm.create(TABLE.Profile, data) // RealmObject
    console.log(`testData ${TABLE.Profile.s()}`, result)
  } catch(e) {
    console.warn(`testData ${TABLE.Profile.s()}`, e, data)
  }
}

export function getTestStructure(){
  return {
    data: {
      [ID]: null,
      [PROFILE.FBuserID.s()]: 'f1',
      [PROFILE.name.s()]: 'UnkleMike',
      [PROFILE.email.s()]: 'mail@gmail.com',
      [PROFILE.location.s()]: 'Bronx',
      [PROFILE.first_name.s()]: 'Mike',
      [PROFILE.last_name.s()]: 'Smith',
      [PROFILE.gender.s()]: true,
      [PROFILE.verified.s()]: true,
      [PROFILE.picture.s()]: 'http://maxpixel.freegreatpicture.com/static/photo/1x/Admin-Administrator-Avator-Man-Blank-Person-Face-161282.png',
      [PROFILE.hasBuyerProfile.s()]: true,
    },
    childs: [
      {
        [CHILD.name.s()]: 'Nik',
        [CHILD.age.s()]: 1,
        [CHILD.gender.s()]: true,
      },
      {
        [CHILD.name.s()]: 'Nino',
        [CHILD.age.s()]: 3,
        [CHILD.gender.s()]: false,
      },
    ],
    tags: [
      [ // for first child
        {
          [TAG.name.s()]: 'Transformer2',
        },
        {
          [TAG.name.s()]: 'Boy2',
        },
      ],
      [ // for second child
        {
          [TAG.name.s()]: 'Doll',
        },
        {
          [TAG.name.s()]: 'Girl',
        }
      ]
    ]
  }
}
