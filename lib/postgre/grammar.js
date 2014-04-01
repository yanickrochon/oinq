
var sqlUtil = require('../util');


module.exports.command = compileCommand;
module.exports.selectFlags = compileSelectFlags;
module.exports.columns = compileColumns;
module.exports.from = compileFrom;


function compileCommand(ctx) {
  return ctx.command.toLocaleUpperCase();
}

function compileSelectFlags(ctx) {
  if (ctx.selectFlags) {
    return ctx.selectFlags.toLocaleUpperCase();
  }
  return '';
}

function compileColumns(ctx) {
  if (ctx.columns = '*') {
    return ctx.columns;
  } else {
    var cols = '';
    for (var i = 0, len = ctx.columns.length; i < len; ++i) {
      if (i > 0) {
        cols += ', ';
      }
      cols += sqlUtil.escape(ctx.columns[i].name);
      if (ctx.columns[i].alias) {
        cols += 'AS ' + sqlUtil.quote(ctx.columns[i].alias);
      }
    }

    return cols;
  }
}

function compileFrom(ctx) {
  var from = '';

  if (ctx.tables) {
    from = 'FROM';
    for (var i = 0, len = ctx.tables.length; i < len; ++i) {
      from += ' ' + sqlUtil.escape(ctx.tables[i].name);
      if (ctx.tables[i].alias) {
        from += 'AS ' + sqlUtil.quote(ctx.tables[i].alias);
      }
    }
  }

  return from;
}
