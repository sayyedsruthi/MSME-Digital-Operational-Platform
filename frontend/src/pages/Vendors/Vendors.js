import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DataTable from "../../components/DataTable";
import { vendorService } from "../../services/vendorService";

export default function Vendors() {
  const navigate = useNavigate();

  const [vendors, setVendors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      const data =
        await vendorService.list();

      setVendors(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load vendors"
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "vendor_name",
      label: "Vendor",
    },
    {
      key: "phone",
      label: "Phone",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "material_supplied",
      label: "Material",
    },
    {
      key: "payment_status",
      label: "Payment",
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
            Vendor Management
          </p>

          <h1>
            Vendor List
          </h1>
        </div>

        <button
          className="primary-btn"
          onClick={() =>
            navigate(
              "/vendors/add"
            )
          }
        >
          Add Vendor
        </button>
      </div>

      <DataTable
        columns={columns}
        data={vendors}
        onView={(row) =>
          navigate(
            `/vendors/${row.id}`
          )
        }
      />
    </div>
  );
}