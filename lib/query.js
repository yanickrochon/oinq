

var pathJoin = require('path').join;


module.exports = getQuery;


function getQuery(adapter) {
  return Object.create(null, {
    select: {
      enumerable: true,
      configurable: false,
      get: function getSelect() {
        return require(pathJoin(__dirname, adapter, 'select'))(new BaseQueryObject(adapter));
      }
    },
    delete: {
      enumerable: true,
      configurable: false,
      get: function getSelect() {
        return require(pathJoin(__dirname, adapter, 'delete'))(new BaseQueryObject(adapter));
      }
    },
    insert: {
      enumerable: true,
      configurable: false,
      get: function getSelect() {
        return require(pathJoin(__dirname, adapter, 'insert'))(new BaseQueryObject(adapter));
      }
    },
    update: {
      enumerable: true,
      configurable: false,
      get: function getSelect() {
        return require(pathJoin(__dirname, adapter, 'update'))(new BaseQueryObject(adapter));
      }
    }
  });
}


function createBaseObject(adapter) {

  return {
    _adapterGrammar: grammer,
    _adapter: adapter
  };
}



function BaseQueryObject(adapter) {
  this._adapter = adapter;
  this._grammar = require(pathJoin(__dirname, adapter, 'grammar'));
}
BaseQueryObject.prototype.toString = function toString() {
  var sql = '';
  var part;

  if (this._grammarProcessor) {
    for (var i = 0, len = this._grammarProcessor.length; i < len; ++i) {
      part = this._grammar[this._grammarProcessor[i]](this._sql);

      if (part) {
        if (i && sql) {
          sql += ' ';
        }
        sql += part;
      }
    }
  }

  return sql;
}
