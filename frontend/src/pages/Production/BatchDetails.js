import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import { productionService } from "../../services/productionService";

export default function BatchDetails() {
  const { id } = useParams();

  const [batch, setBatch] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadBatch();
  }, [id]);

  const loadBatch = async () => {
    try {
      const data =
        await productionService.get(
          id
        );

      setBatch(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <h2>Loading...</h2>;

  if (!batch)
    return (
      <h2>Batch Not Found</h2>
    );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Batch Tracking
          </p>

          <h1>
            {batch.batch_number}
          </h1>

          <p>
            {batch.product_name}
          </p>
        </div>
      </div>

      <section className="panel detail-grid">
        <p>
          <strong>
            Quantity:
          </strong>{" "}
          {batch.quantity}
        </p>

        <p>
          <strong>
            Start Date:
          </strong>{" "}
          {batch.start_date}
        </p>

        <p>
          <strong>
            End Date:
          </strong>{" "}
          {batch.end_date}
        </p>

        <p>
          <strong>
            Status:
          </strong>{" "}
          {batch.status}
        </p>
      </section>
    </div>
  );
}