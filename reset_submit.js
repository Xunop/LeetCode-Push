const aircode = require('aircode');

module.exports = async function(params, context) {
  // All update operators are nested in `aircode.db`
  const { db } = aircode;
  // Use `db.table` to get a table
  const recTable = aircode.db.table('records');

  // Use `set` to specific conditions, then use `save` to update
  const result = await recTable
    .where()
    .set({
      status: 'false',
      validSubmit: 0,
      allSubmit: 0,
    })
    .save();
  return {
    result,
  };
}