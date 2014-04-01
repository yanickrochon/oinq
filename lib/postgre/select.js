



module.exports = selectQuery;



function selectQuery(base) {
  base._grammarProcessor = [
    'command', 'selectFlags', 'columns', 'from',
    //'join', 'where', 'groupBy', 'having',
    //'union',
    //'orderBy',
    //'limit', 'offset',
    //'fetch',
    //'for'
  ];

  base._sql = {
    command: 'SELECT',
    columns: '*'
  };

  return Object.create(base, {
    columns: {
      enumerable: true,
      configurable: false,
      writable: false,
      value: columnSelect
    },
    from: {
      enumerable: true,
      configurable: false,
      writable: false,
      value: fromClause
    }
  });
}



function columnSelect(column, alias) {
  var names;
  var name;
  var i;
  var len;

  this._sql.columns = this._sql.columns || [];
  if (this._sql.columns === '*') {
    this._sql.columns = [];
  } else if (typeof this._sql.columns === 'string') {
    this._sql.columns = [ { name: this._sql.columns } ];
  }

  if (typeof column === 'string') {
    this._sql.columns.push({ name: column, alias: alias });
  } else if (column instanceof Array) {
    for (i = 0, i < column.length; i < len; ++i) {
      this._sql.columns.push({ name: column[i], alias: alias && alias[i] });
    }
  } else {
    names = Object.keys(column);
    for (i = 0, i < names.length; i < len; ++i) {
      name = names[i];
      this._sql.columns.push({ name: name, alias: names[name] });
    }
  }
  return this;
}

function fromClause(tableName, alias) {
  var names;
  var name;
  var i;
  var len;

  this._sql.tables = this._sql.tables || [];

  if (typeof tableName === 'string') {
    this._sql.tables.push({ name: tableName, alias: alias });
  } else if (tableName instanceof Array) {
    for (i = 0, i < tableName.length; i < len; ++i) {
      this._sql.tables.push({ name: tableName[i], alias: alias && alias[i] });
    }
  } else {
    names = Object.keys(tableName);
    for (i = 0, i < names.length; i < len; ++i) {
      name = names[i];
      this._sql.tables.push({ name: name, alias: names[name] });
    }
  }
  return this;
}
