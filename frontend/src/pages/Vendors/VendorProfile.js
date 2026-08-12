import {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import { vendorService } from "../../services/vendorService";

export default function VendorProfile() {
  const { id } = useParams();

  const [vendor, setVendor] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadVendor();
  }, [id]);

  const loadVendor = async () => {
    try {
      const data =
        await vendorService.get(id);

      setVendor(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <h2>Loading...</h2>;

  if (!vendor)
    return (
      <h2>Vendor Not Found</h2>
    );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">
            Vendor Profile
          </p>

          <h1>
            {vendor.vendor_name}
          </h1>

          <p>
            {
              vendor.material_supplied
            }
          </p>
        </div>
      </div>

      <section className="panel detail-grid">
        <p>
          <strong>
            Phone:
          </strong>{" "}
          {vendor.phone}
        </p>

        <p>
          <strong>
            Email:
          </strong>{" "}
          {vendor.email}
        </p>

        <p>
          <strong>
            Material:
          </strong>{" "}
          {
            vendor.material_supplied
          }
        </p>

        <p>
          <strong>
            Payment:
          </strong>{" "}
          {
            vendor.payment_status
          }
        </p>
      </section>
    </div>
  );
}