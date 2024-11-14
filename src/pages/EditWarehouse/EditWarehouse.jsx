import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditWarehouse.scss";
import WarehouseFormReusable from "/src/components/WarehouseFormReusable/WarehouseFormReusable.jsx";
const EditWarehouse = ({ warehouseId }) => {
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

  // Fetch warehouse data to pre-fill the form
  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/warehouses/${warehouseId}`
        );
        setFormData(response.data);
      } catch (err) {
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
    setError("");
    setSuccess("");

    try {
      const response = await axios.put(
        `http://localhost:8080/warehouses/${warehouseId}`,
        formData
      );
      setSuccess("Warehouse updated successfully.");
      setFormData(response.data); // Update form with the latest data
    } catch (err) {
      setError(
        "Failed to update warehouse. Please check the form fields and try again."
      );
    }
  };

  const handleCancel = () => {
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
    setSuccess("");
    setError("Edit canceled, form reset.");
  };

  return (
    <div className="edit-warehouse">
      <header className="edit-warehouse__header">
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
