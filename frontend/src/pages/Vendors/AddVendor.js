import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";

import { vendorService } from "../../services/vendorService";

export default function AddVendor() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      vendorName: "",
      phone: "",
      email: "",
      materialSupplied: "",
      paymentStatus: "Pending",
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

      await vendorService.create(
        form
      );

      navigate("/vendors");
    } catch (err) {
      setError(
        err.response?.data
          ?.message ||
          "Failed to create vendor"
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
            Vendors
          </p>

          <h1>
            Add Vendor
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
            label="Vendor Name"
            value={
              form.vendorName
            }
            onChange={(e) =>
              setForm({
                ...form,
                vendorName:
                  e.target
                    .value,
              })
            }
          />

          <FormInput
            label="Phone"
            value={
              form.phone
            }
            onChange={(e) =>
              setForm({
                ...form,
                phone:
                  e.target
                    .value,
              })
            }
          />

          <FormInput
            label="Email"
            type="email"
            value={
              form.email
            }
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target
                    .value,
              })
            }
          />

          <FormInput
            label="Material Supplied"
            value={
              form.materialSupplied
            }
            onChange={(e) =>
              setForm({
                ...form,
                materialSupplied:
                  e.target
                    .value,
              })
            }
          />

          <FormSelect
            label="Payment Status"
            options={[
              "Paid",
              "Pending",
              "Due",
            ]}
            value={
              form.paymentStatus
            }
            onChange={(e) =>
              setForm({
                ...form,
                paymentStatus:
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
              : "Save Vendor"}
          </button>
        </form>
      </section>
    </div>
  );
}