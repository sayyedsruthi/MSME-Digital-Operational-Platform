import {
  useEffect,
  useState,
} from "react";

import DataTable from "../../components/DataTable";
import { reportService } from "../../services/reportService";

export default function InventoryReport() {
  const [inventory, setInventory] =
    useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    const data =
      await reportService.inventory();

    setInventory(data);
  };

  const columns = [
    {
      key: "product_name",
      label: "Product",
    },
    {
      key: "category",
      label: "Category",
    },
    {
      key: "quantity",
      label: "Qty",
    },
    {
      key: "minimum_stock",
      label: "Minimum Stock",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Inventory Report
          </p>

          <h1>
            Stock Summary
          </h1>
        </div>

        <button
          className="primary-btn"
        >
          Export Excel
        </button>
      </div>

      <DataTable
        columns={columns}
        data={inventory}
      />
    </div>
  );
}