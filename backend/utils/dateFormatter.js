function toMysqlDate(date = new Date()) {
  return new Date(date).toISOString().slice(0, 10);
}

function toMysqlDateTime(date = new Date()) {
  return new Date(date).toISOString().slice(0, 19).replace("T", " ");
}

module.exports = { toMysqlDate, toMysqlDateTime };
