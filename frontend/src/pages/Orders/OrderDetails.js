import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import { orderService } from "../../services/orderService";

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const data =
        await orderService.get(id);

      setOrder(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <h2>Loading...</h2>;

  if (!order)
    return (
      <h2>Order Not Found</h2>
    );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Order Tracking
          </p>

          <h1>
            Order #{order.id}
          </h1>

          <p>
            {
              order.customer_name
            }
          </p>
        </div>
      </div>

      <section className="panel detail-grid">
        <p>
          <strong>
            Customer:
          </strong>{" "}
          {
            order.customer_name
          }
        </p>

        <p>
          <strong>
            Product:
          </strong>{" "}
          {
            order.product_name
          }
        </p>

        <p>
          <strong>
            Quantity:
          </strong>{" "}
          {order.quantity}
        </p>

        <p>
          <strong>
            Status:
          </strong>{" "}
          {order.status}
        </p>

        <p>
          <strong>
            Delivery Date:
          </strong>{" "}
          {
            order.delivery_date
          }
        </p>
      </section>
    </div>
  );
}