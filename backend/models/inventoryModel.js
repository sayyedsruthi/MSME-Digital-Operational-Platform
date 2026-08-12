const { query } = require("../config/db");

const table = "inventory";

exports.findAll = () => query(`SELECT * FROM ${table} ORDER BY id DESC`);
exports.findById = async (id) => (await query(`SELECT * FROM ${table} WHERE id = ?`, [id]))[0];
exports.create = async (item) => {
  const result = await query(
    `INSERT INTO ${table} (product_name, category, quantity, unit, minimum_stock, supplier_id) VALUES (?, ?, ?, ?, ?, ?)`,
    [item.productName, item.category, item.quantity, item.unit, item.minimumStock, item.supplierId || null]
  );
  return exports.findById(result.insertId);
};
exports.update = async (id, item) => {
  await query(
    `UPDATE ${table} SET product_name = ?, category = ?, quantity = ?, unit = ?, minimum_stock = ?, supplier_id = ? WHERE id = ?`,
    [item.productName, item.category, item.quantity, item.unit, item.minimumStock, item.supplierId || null, id]
  );
  return exports.findById(id);
};
exports.remove = (id) => query(`DELETE FROM ${table} WHERE id = ?`, [id]);
