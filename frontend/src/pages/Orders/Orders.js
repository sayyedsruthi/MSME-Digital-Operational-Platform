import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DataTable from "../../components/DataTable";
import { orderService } from "../../services/orderService";

export default function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data =
        await orderService.list();

      setOrders(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "id",
      label: "Order ID",
    },
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

  if (loading)
    return <h2>Loading...</h2>;

  if (error)
    return <h2>{error}</h2>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Order Management
          </p>

          <h1>
            Orders Dashboard
          </h1>
        </div>

        <button
          className="primary-btn"
          onClick={() =>
            navigate(
              "/orders/create"
            )
          }
        >
          Create Order
        </button>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        onView={(row) =>
          navigate(
            `/orders/${row.id}`
          )
        }
      />
    </div>
  );
}