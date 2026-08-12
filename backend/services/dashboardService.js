const { query } = require("../config/db");

exports.getSummary = async () => {
  const [inventoryCount] =
    await query(
      "SELECT COUNT(*) AS total FROM inventory"
    );

  const [orderCount] =
    await query(
      "SELECT COUNT(*) AS total FROM orders"
    );

  const [employeeCount] =
    await query(
      "SELECT COUNT(*) AS total FROM employees"
    );

  const [vendorCount] =
    await query(
      "SELECT COUNT(*) AS total FROM vendors"
    );

  const [productionCount] =
    await query(
      "SELECT COUNT(*) AS total FROM production"
    );

  const lowStock =
    await query(
      `SELECT * FROM inventory
       WHERE quantity <= minimum_stock`
    );

  return {
    totals: {
      inventory:
        inventoryCount.total,

      orders:
        orderCount.total,

      employees:
        employeeCount.total,

      vendors:
        vendorCount.total,

      production:
        productionCount.total,
    },

    lowStock,
  };
};