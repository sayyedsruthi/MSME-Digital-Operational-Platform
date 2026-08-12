import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import DataTable from "../../components/DataTable";
import FilterBar from "../../components/FilterBar";
import SearchBar from "../../components/SearchBar";

import { inventoryService } from "../../services/inventoryService";

export default function InventoryList() {
  const navigate = useNavigate();

  const [inventory, setInventory] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [query, setQuery] =
    useState("");

  const [status, setStatus] =
    useState("");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);

      const data =
        await inventoryService.list();

      setInventory(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load inventory"
      );
    } finally {
      setLoading(false);
    }
  };

  const rows = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        [
          item.product_name,
          item.category,
        ]
          .join(" ")
          .toLowerCase()
          .includes(
            query.toLowerCase()
          );

      const itemStatus =
        item.quantity <=
        item.minimum_stock
          ? "Low"
          : "Healthy";

      const matchesStatus =
        !status ||
        itemStatus === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    inventory,
    query,
    status,
  ]);

  const columns = [
    {
      key: "id",
      label: "ID",
    },
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
      key: "unit",
      label: "Unit",
    },
    {
      key: "minimum_stock",
      label: "Min Stock",
    },
    {
      key: "supplier_id",
      label: "Supplier",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => {
        const low =
          row.quantity <=
          row.minimum_stock;

        return (
          <span
            className={`status ${
              low
                ? "warn"
                : "good"
            }`}
          >
            {low
              ? "Low"
              : "Healthy"}
          </span>
        );
      },
    },
  ];

  if (loading)
    return (
      <h2>Loading...</h2>
    );

  if (error)
    return <h2>{error}</h2>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Inventory Management
          </p>

          <h1>
            Inventory List
          </h1>
        </div>

        <button
          className="primary-btn"
          onClick={() =>
            navigate(
              "/inventory/add"
            )
          }
        >
          Add Inventory
        </button>
      </div>

      <section className="panel table-toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
        />

        <FilterBar
          value={status}
          onChange={setStatus}
          options={[
            "Healthy",
            "Low",
          ]}
        />
      </section>

      <DataTable
        columns={columns}
        data={rows}
        onView={(row) =>
          navigate(
            `/inventory/${row.id}`
          )
        }
        onEdit={(row) =>
          navigate(
            `/inventory/edit/${row.id}`
          )
        }
      />
    </div>
  );
}