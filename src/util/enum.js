'use strict';

function Enum() {
  var _this = this;

  if (!(this instanceof Enum)) {
    return new (Function.prototype.bind.apply(Enum, [null].concat(Array.prototype.slice.call(arguments))))();
  }
  Array.from(arguments).forEach(arg => {
    const s = Symbol(arg)
    _this[arg] = s
  })
}
Symbol.prototype.s = function(param){
  // console.log("Symbol.prototype", this.valueOf());
  return this.toString().slice(7, -1)
}

module.exports = Enum;
