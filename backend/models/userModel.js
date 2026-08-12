const { query } = require("../config/db");

const table = "users";

exports.findAll = () => query(`SELECT id, name, email, role, created_at FROM ${table} ORDER BY id DESC`);
exports.findById = async (id) => (await query(`SELECT id, name, email, role, created_at FROM ${table} WHERE id = ?`, [id]))[0];
exports.findByEmail = async (email) => (await query(`SELECT * FROM ${table} WHERE email = ?`, [email]))[0];
exports.create = async ({ name, email, password, role }) => {
  const result = await query(`INSERT INTO ${table} (name, email, password, role) VALUES (?, ?, ?, ?)`, [name, email, password, role]);
  return exports.findById(result.insertId);
};
exports.update = async (id, { name, email, role }) => {
  await query(`UPDATE ${table} SET name = ?, email = ?, role = ? WHERE id = ?`, [name, email, role, id]);
  return exports.findById(id);
};
exports.remove = (id) => query(`DELETE FROM ${table} WHERE id = ?`, [id]);
