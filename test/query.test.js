
var query = require('../lib/query');

describe('Test Query', function () {

  it('should.... shutup', function () {

    console.log(query('postgre').select.from(['foo', 'bar']).toString());


  });


});
