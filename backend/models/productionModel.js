const { query } = require("../config/db");

const table = "production";

exports.findAll = () => query(`SELECT * FROM ${table} ORDER BY id DESC`);
exports.findById = async (id) => (await query(`SELECT * FROM ${table} WHERE id = ?`, [id]))[0];
exports.create = async (batch) => {
  const result = await query(
    `INSERT INTO ${table} (batch_number, product_name, quantity, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [batch.batchNumber, batch.productName, batch.quantity, batch.startDate, batch.endDate, batch.status]
  );
  return exports.findById(result.insertId);
};
exports.update = async (id, batch) => {
  await query(
    `UPDATE ${table} SET batch_number = ?, product_name = ?, quantity = ?, start_date = ?, end_date = ?, status = ? WHERE id = ?`,
    [batch.batchNumber, batch.productName, batch.quantity, batch.startDate, batch.endDate, batch.status, id]
  );
  return exports.findById(id);
};
exports.remove = (id) => query(`DELETE FROM ${table} WHERE id = ?`, [id]);
