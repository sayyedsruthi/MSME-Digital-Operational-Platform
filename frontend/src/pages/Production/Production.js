import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DataTable from "../../components/DataTable";
import { productionService } from "../../services/productionService";

export default function Production() {
  const navigate = useNavigate();

  const [batches, setBatches] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    try {
      const data =
        await productionService.list();

      setBatches(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load production batches"
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "batch_number",
      label: "Batch",
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
      key: "start_date",
      label: "Start",
    },
    {
      key: "end_date",
      label: "End",
    },
    {
      key: "status",
      label: "Status",
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
            Production Tracking
          </p>

          <h1>
            Production Dashboard
          </h1>
        </div>

        <button
          className="primary-btn"
          onClick={() =>
            navigate(
              "/production/create"
            )
          }
        >
          Create Batch
        </button>
      </div>

      <DataTable
        columns={columns}
        data={batches}
        onView={(row) =>
          navigate(
            `/production/${row.id}`
          )
        }
      />
    </div>
  );
}