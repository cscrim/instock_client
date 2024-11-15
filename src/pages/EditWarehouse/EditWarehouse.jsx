import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditWarehouse.scss";
import WarehouseFormReusable from "/src/components/WarehouseFormReusable/WarehouseFormReusable.jsx";
import { useParams, Link } from "react-router-dom";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";

const BASE_URL = import.meta.env.VITE_API_URL;

const EditWarehouse = () => {
  const { warehouseId } = useParams(); // Extract warehouseId from route
  const [formData, setFormData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Validate that warehouseId is available
    if (!warehouseId) {
      setError("Invalid warehouse ID.");
      return;
    }

    const fetchWarehouse = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/warehouses/${warehouseId}`
        );
        setFormData(response.data); // Fill the form with fetched data
      } catch (err) {
        console.error(err);
        setError("Failed to load warehouse details.");
      }
    };

    fetchWarehouse();
  }, [warehouseId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset any existing errors
    setSuccess(""); // Reset success message

    // Remove created_at or any unnecessary fields before sending data
    const { created_at, ...updatedData } = formData;

    try {
      const response = await axios.put(
        `${BASE_URL}/warehouses/${warehouseId}`,
        updatedData // Send the updated data without created_at
      );
      setSuccess("Warehouse updated successfully.");
      setFormData(response.data); // Populate form with updated data from response
    } catch (err) {
      console.error(err.response?.data || "Unknown error");
      setError(
        err.response?.data?.message ||
          "Failed to update warehouse. Please check the form fields and try again."
      );
    }
  };

  const handleCancel = () => {
    // Reset the form data
    setFormData({
      warehouse_name: "",
      address: "",
      city: "",
      country: "",
      contact_name: "",
      contact_position: "",
      contact_phone: "",
      contact_email: "",
    });
    setError(""); // Clear error on cancel
    setSuccess("Edit canceled, form reset.");
  };

  return (
    <div className="edit-warehouse">
      <header className="edit-warehouse__header">
        <Link to="/warehouses" className="edit-warehouse__back-link">
          <img
            src={backArrow}
            className="warehouse-details__back-button"
            alt="Back arrow"
          />
        </Link>
        <h2>Edit Warehouse</h2>
      </header>

      {error && <div className="edit-warehouse__error">{error}</div>}
      {success && <div className="edit-warehouse__success">{success}</div>}

      <WarehouseFormReusable
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default EditWarehouse;
