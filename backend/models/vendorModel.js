const { query } = require("../config/db");

const table = "vendors";

exports.findAll = () => query(`SELECT * FROM ${table} ORDER BY id DESC`);
exports.findById = async (id) => (await query(`SELECT * FROM ${table} WHERE id = ?`, [id]))[0];
exports.create = async (vendor) => {
  const result = await query(
    `INSERT INTO ${table} (vendor_name, phone, email, material_supplied, payment_status) VALUES (?, ?, ?, ?, ?)`,
    [vendor.vendorName, vendor.phone, vendor.email, vendor.materialSupplied, vendor.paymentStatus]
  );
  return exports.findById(result.insertId);
};
exports.update = async (id, vendor) => {
  await query(
    `UPDATE ${table} SET vendor_name = ?, phone = ?, email = ?, material_supplied = ?, payment_status = ? WHERE id = ?`,
    [vendor.vendorName, vendor.phone, vendor.email, vendor.materialSupplied, vendor.paymentStatus, id]
  );
  return exports.findById(id);
};
exports.remove = (id) => query(`DELETE FROM ${table} WHERE id = ?`, [id]);
