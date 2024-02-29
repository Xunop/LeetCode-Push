const aircode = require('aircode');

module.exports = async function(params, context) {
  // Use `aircode.db.table` to get a table
  const recTable = aircode.db.table('records');

  // Return fields include `_id` and `item`
  const all = await recTable
    .where()
    .projection({ name: 1,  validSubmit: 1})
    .find();

  all.sort((a, b) => b.validSubmit - a.validSubmit);
  const resultString = all.map(item => `${item.name}: ${item.validSubmit}`).join('\n');
  return { 'data': resultString };
}