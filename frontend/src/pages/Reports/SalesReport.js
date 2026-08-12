import {
  useEffect,
  useState,
} from "react";

import DataTable from "../../components/DataTable";
import { reportService } from "../../services/reportService";

export default function SalesReport() {
  const [orders, setOrders] =
    useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    const data =
      await reportService.sales();

    setOrders(data);
  };

  const columns = [
    {
      key: "customer_name",
      label: "Customer",
    },
    {
      key: "product_name",
      label: "Product",
    },
    {
      key: "quantity",
      label: "Qty",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "delivery_date",
      label: "Delivery",
    },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Sales Report
          </p>

          <h1>
            Orders Summary
          </h1>
        </div>

        <button
          className="primary-btn"
        >
          Export PDF
        </button>
      </div>

      <DataTable
        columns={columns}
        data={orders}
      />
    </div>
  );
}