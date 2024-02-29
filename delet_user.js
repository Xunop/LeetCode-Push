const aircode = require('aircode');

module.exports = async function(params, context) {
  // All operators are nested in `aircode.db`
  const { db } = aircode;
  // Use `db.table` to get a table
  const recTable = aircode.db.table('records');

  const user = params.user.trim()
  // Use `find` to get records
  const result = await recTable
    .where({ name: user })
    .delete();

  return {
    result,
  };
}