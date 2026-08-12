const { query } = require("../config/db");

const table = "attendance";

exports.findAll = () => query(`SELECT * FROM ${table} ORDER BY date DESC, id DESC`);
exports.findById = async (id) => (await query(`SELECT * FROM ${table} WHERE id = ?`, [id]))[0];
exports.create = async (attendance) => {
  const result = await query(
    `INSERT INTO ${table} (employee_id, date, status) VALUES (?, ?, ?)`,
    [attendance.employeeId, attendance.date, attendance.status]
  );
  return exports.findById(result.insertId);
};
exports.update = async (id, attendance) => {
  await query(
    `UPDATE ${table} SET employee_id = ?, date = ?, status = ? WHERE id = ?`,
    [attendance.employeeId, attendance.date, attendance.status, id]
  );
  return exports.findById(id);
};
exports.remove = (id) => query(`DELETE FROM ${table} WHERE id = ?`, [id]);
