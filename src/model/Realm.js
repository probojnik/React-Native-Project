import Realm from 'realm'
import Schema from './Schema';
import * as Profile from './Profile';
import { Utils, Enum } from '../util'

const VERSION = 31
function getRealm() {
  var result
  try {
    result = new Realm({
        path: Realm.defaultPath, // +VERSION
        schema: Object.values(Schema),
        schemaVersion: VERSION,
        migration: (oldRealm, newRealm) => {
          console.log('migration', 'oldRealm:', oldRealm.schemaVersion,
            'newRealm:', newRealm.schemaVersion)
            newRealm.deleteAll()
            Profile.testData(newRealm)
            // oldRealm.write(function(){
            //   oldRealm.deleteAll()
            // })
            // oldRealm.close()
        }
      })
  } catch(e) {
    console.warn("getRealm", e, result)
  }
  return result
}

export default getRealm()
