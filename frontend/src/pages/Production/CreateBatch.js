import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";

import { productionService } from "../../services/productionService";

export default function CreateBatch() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      batchNumber: "",
      productName: "",
      quantity: "",
      startDate: "",
      endDate: "",
      status: "Planned",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await productionService.create(
        form
      );

      navigate("/production");
    } catch (err) {
      setError(
        err.response?.data
          ?.message ||
          "Failed to create batch"
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
            Production
          </p>

          <h1>
            Create Batch
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
          onSubmit={
            handleSubmit
          }
        >
          <FormInput
            label="Batch Number"
            value={
              form.batchNumber
            }
            onChange={(e) =>
              setForm({
                ...form,
                batchNumber:
                  e.target
                    .value,
              })
            }
          />

          <FormInput
            label="Product Name"
            value={
              form.productName
            }
            onChange={(e) =>
              setForm({
                ...form,
                productName:
                  e.target
                    .value,
              })
            }
          />

          <FormInput
            label="Quantity"
            type="number"
            value={
              form.quantity
            }
            onChange={(e) =>
              setForm({
                ...form,
                quantity:
                  e.target
                    .value,
              })
            }
          />

          <FormInput
            label="Start Date"
            type="date"
            value={
              form.startDate
            }
            onChange={(e) =>
              setForm({
                ...form,
                startDate:
                  e.target
                    .value,
              })
            }
          />

          <FormInput
            label="End Date"
            type="date"
            value={
              form.endDate
            }
            onChange={(e) =>
              setForm({
                ...form,
                endDate:
                  e.target
                    .value,
              })
            }
          />

          <FormSelect
            label="Status"
            options={[
              "Planned",
              "In Progress",
              "Completed",
            ]}
            value={
              form.status
            }
            onChange={(e) =>
              setForm({
                ...form,
                status:
                  e.target
                    .value,
              })
            }
          />

          <button
            className="primary-btn"
            type="submit"
            disabled={
              loading
            }
          >
            {loading
              ? "Saving..."
              : "Save Batch"}
          </button>
        </form>
      </section>
    </div>
  );
}