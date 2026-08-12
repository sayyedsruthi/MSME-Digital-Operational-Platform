const { query } = require("../config/db");

const table = "notifications";

exports.findAll = () => query(`SELECT * FROM ${table} ORDER BY id DESC`);
exports.findById = async (id) => (await query(`SELECT * FROM ${table} WHERE id = ?`, [id]))[0];
exports.create = async (notification) => {
  const result = await query(
    `INSERT INTO ${table} (message, type, read_status) VALUES (?, ?, ?)`,
    [notification.message, notification.type, notification.readStatus || false]
  );
  return exports.findById(result.insertId);
};
exports.update = async (id, notification) => {
  await query(
    `UPDATE ${table} SET message = ?, type = ?, read_status = ? WHERE id = ?`,
    [notification.message, notification.type, notification.readStatus, id]
  );
  return exports.findById(id);
};
exports.remove = (id) => query(`DELETE FROM ${table} WHERE id = ?`, [id]);
