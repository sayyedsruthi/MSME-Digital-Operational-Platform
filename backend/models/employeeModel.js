const { query } = require("../config/db");

const table = "employees";

exports.findAll = () => query(`SELECT * FROM ${table} ORDER BY id DESC`);
exports.findById = async (id) => (await query(`SELECT * FROM ${table} WHERE id = ?`, [id]))[0];
exports.create = async (employee) => {
  const result = await query(
    `INSERT INTO ${table} (name, department, role, salary) VALUES (?, ?, ?, ?)`,
    [employee.name, employee.department, employee.role, employee.salary]
  );
  return exports.findById(result.insertId);
};
exports.update = async (id, employee) => {
  await query(
    `UPDATE ${table} SET name = ?, department = ?, role = ?, salary = ? WHERE id = ?`,
    [employee.name, employee.department, employee.role, employee.salary, id]
  );
  return exports.findById(id);
};
exports.remove = (id) => query(`DELETE FROM ${table} WHERE id = ?`, [id]);
