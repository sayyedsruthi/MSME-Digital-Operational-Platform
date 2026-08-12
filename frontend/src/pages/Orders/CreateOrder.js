import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";

import { orderService } from "../../services/orderService";

export default function CreateOrder() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      customerName: "",
      productName: "",
      quantity: "",
      status: "Pending",
      deliveryDate: "",
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

      await orderService.create(
        form
      );

      navigate("/orders");
    } catch (err) {
      setError(
        err.response?.data
          ?.message ||
          "Failed to create order"
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
            Orders
          </p>

          <h1>
            Create Order
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
            label="Customer Name"
            value={
              form.customerName
            }
            onChange={(e) =>
              setForm({
                ...form,
                customerName:
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

          <FormSelect
            label="Status"
            options={[
              "Pending",
              "In Production",
              "Packed",
              "Dispatched",
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

          <FormInput
            label="Delivery Date"
            type="date"
            value={
              form.deliveryDate
            }
            onChange={(e) =>
              setForm({
                ...form,
                deliveryDate:
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
              : "Save Order"}
          </button>
        </form>
      </section>
    </div>
  );
}