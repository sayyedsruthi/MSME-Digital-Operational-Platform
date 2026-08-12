import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import { inventoryService } from "../../services/inventoryService";

export default function InventoryDetails() {
  const { id } = useParams();

  const [item, setItem] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      const data =
        await inventoryService.get(
          id
        );

      setItem(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <h2>Loading...</h2>
    );

  if (!item)
    return (
      <h2>
        Inventory item not found
      </h2>
    );

  const status =
    item.quantity <=
    item.minimum_stock
      ? "Low"
      : "Healthy";

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Inventory Details
          </p>

          <h1>
            {item.product_name}
          </h1>

          <p>
            {item.category}
          </p>
        </div>
      </div>

      <section className="panel detail-grid">
        <p>
          <strong>ID:</strong>
          {" "}
          {item.id}
        </p>

        <p>
          <strong>
            Quantity:
          </strong>
          {" "}
          {item.quantity}
          {" "}
          {item.unit}
        </p>

        <p>
          <strong>
            Minimum Stock:
          </strong>
          {" "}
          {item.minimum_stock}
        </p>

        <p>
          <strong>
            Supplier ID:
          </strong>
          {" "}
          {item.supplier_id}
        </p>

        <p>
          <strong>
            Status:
          </strong>
          {" "}
          {status}
        </p>
      </section>
    </div>
  );
}