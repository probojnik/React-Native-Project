export default class RealmModel {
  static types = {
    bool: true,
    string: true,
    int: true,
    boolean: true,
    float: true,
    double: true,
    date: true
  }

  toString() {
    console.log('RealmModel', 'toString');
    return JSON.stringify(this.toJSON());
  }

  toJSON() {
    let schema = this.constructor.schema.properties;
    let json = {};
    for (var varId in schema) {
      if (schema.hasOwnProperty(varId)) {
        let type = null;
        if(schema[varId] instanceof Object){
          type = schema[varId]['type'];
        } else {
          type = schema[varId];
        }

        if(RealmModel.types[type]) {
          json[varId] = this[varId];
        } else if(type === 'list') {
          let obj = this[varId];
          json[varId] = [];
          for(let i = 0; i < obj.length; i++){
            json[varId].push(obj[i].toJSON());
          }
        } else {
          json[varId] = this[varId].toJSON();
        }
      }
    }
    return json;
  }
}
