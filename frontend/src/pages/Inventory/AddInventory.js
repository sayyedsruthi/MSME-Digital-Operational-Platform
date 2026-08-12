import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/FormInput";
import { inventoryService } from "../../services/inventoryService";

export default function AddInventory() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productName: "",
    category: "",
    quantity: "",
    unit: "",
    minimumStock: "",
    supplierId: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await inventoryService.create(
        form
      );

      navigate("/inventory");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create inventory item"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Inventory
          </p>

          <h1>
            Add Inventory Item
          </h1>
        </div>
      </div>

      <section className="panel">
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <form
          className="form-grid"
          onSubmit={handleSubmit}
        >
          <FormInput
            label="Product Name"
            value={form.productName}
            onChange={(e) =>
              setForm({
                ...form,
                productName:
                  e.target.value,
              })
            }
          />

          <FormInput
            label="Category"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category:
                  e.target.value,
              })
            }
          />

          <FormInput
            label="Quantity"
            type="number"
            value={form.quantity}
            onChange={(e) =>
              setForm({
                ...form,
                quantity:
                  e.target.value,
              })
            }
          />

          <FormInput
            label="Unit"
            value={form.unit}
            onChange={(e) =>
              setForm({
                ...form,
                unit:
                  e.target.value,
              })
            }
          />

          <FormInput
            label="Minimum Stock"
            type="number"
            value={form.minimumStock}
            onChange={(e) =>
              setForm({
                ...form,
                minimumStock:
                  e.target.value,
              })
            }
          />

          <FormInput
            label="Supplier ID"
            value={form.supplierId}
            onChange={(e) =>
              setForm({
                ...form,
                supplierId:
                  e.target.value,
              })
            }
          />

          <button
            className="primary-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save Item"}
          </button>
        </form>
      </section>
    </div>
  );
}