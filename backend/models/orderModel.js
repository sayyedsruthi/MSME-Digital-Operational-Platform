const { query } = require("../config/db");

const table = "orders";

exports.findAll = () => query(`SELECT * FROM ${table} ORDER BY id DESC`);
exports.findById = async (id) => (await query(`SELECT * FROM ${table} WHERE id = ?`, [id]))[0];
exports.create = async (order) => {
  const result = await query(
    `INSERT INTO ${table} (customer_name, product_name, quantity, status, delivery_date) VALUES (?, ?, ?, ?, ?)`,
    [order.customerName, order.productName, order.quantity, order.status, order.deliveryDate]
  );
  return exports.findById(result.insertId);
};
exports.update = async (id, order) => {
  await query(
    `UPDATE ${table} SET customer_name = ?, product_name = ?, quantity = ?, status = ?, delivery_date = ? WHERE id = ?`,
    [order.customerName, order.productName, order.quantity, order.status, order.deliveryDate, id]
  );
  return exports.findById(id);
};
exports.remove = (id) => query(`DELETE FROM ${table} WHERE id = ?`, [id]);
