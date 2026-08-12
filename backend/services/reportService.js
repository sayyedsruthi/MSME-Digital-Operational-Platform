const { query } = require("../config/db");

exports.inventoryReport = () => query("SELECT product_name, category, quantity, minimum_stock FROM inventory ORDER BY product_name");
exports.salesReport = () => query("SELECT customer_name, product_name, quantity, status, delivery_date FROM orders ORDER BY delivery_date DESC");
exports.employeeReport = () => query("SELECT name, department, role, salary FROM employees ORDER BY department, name");
