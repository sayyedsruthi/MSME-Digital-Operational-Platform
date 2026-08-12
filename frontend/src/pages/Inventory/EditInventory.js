import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import FormInput from "../../components/FormInput";

import { inventoryService } from "../../services/inventoryService";

export default function EditInventory() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      const item =
        await inventoryService.get(
          id
        );

      setForm({
        productName:
          item.product_name,
        category:
          item.category,
        quantity:
          item.quantity,
        unit: item.unit,
        minimumStock:
          item.minimum_stock,
        supplierId:
          item.supplier_id || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await inventoryService.update(
        id,
        form
      );

      navigate("/inventory");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <h2>Loading...</h2>;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Inventory
          </p>

          <h1>
            Edit Inventory
          </h1>
        </div>
      </div>

      <section className="panel">
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
            disabled={saving}
          >
            {saving
              ? "Updating..."
              : "Update Item"}
          </button>
        </form>
      </section>
    </div>
  );
}