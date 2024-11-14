import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditWarehouse.scss";

// Reusable FormInput component
const FormInput = ({ label, name, value, onChange, error, type = "text" }) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      aria-label={label}
      className={error ? "error" : ""}
    />
    {error && <p className="error">{error}</p>}
  </div>
);

const EditWarehouse = ({ warehouseId }) => {
  const BASE_URL =
    import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;

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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch warehouse details
    axios
      .get(`${BASE_URL}/warehouses/${warehouseId}`)
      .then((response) => {
        setFormData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching warehouse:", error);
        setLoading(false);
      });
  }, [warehouseId, BASE_URL]);

  const validate = () => {
    const phoneRegex =
      /^\+?(\d{1,3})?[-.\s]?(\(\d{1,3}\)|\d{1,3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let tempErrors = {};

    // Required field validation
    for (let field in formData) {
      if (!formData[field].trim()) {
        tempErrors[field] = "This field is required";
      }
    }

    // Custom format validation
    if (formData.contact_phone && !phoneRegex.test(formData.contact_phone)) {
      tempErrors.contact_phone = "Invalid phone number format";
    }
    if (formData.contact_email && !emailRegex.test(formData.contact_email)) {
      tempErrors.contact_email = "Invalid email format";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios
        .put(`${BASE_URL}/warehouses/${warehouseId}`, formData)
        .then((response) => {
          alert("Warehouse updated successfully");
          // Optionally reset form data or redirect
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
        })
        .catch((error) => {
          console.error("Error updating warehouse:", error);
        });
    }
  };

  const handleCancel = () => {
    // Logic to reset form data or navigate away
    if (
      window.confirm(
        "Are you sure you want to cancel? All changes will be lost."
      )
    ) {
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
    }
  };

  if (loading) {
    return <div>Loading...</div>; //   loader
  }

  return (
    <form className="edit-warehouse-form" onSubmit={handleSubmit}>
      <section className="form__details">
        <div className="warehouse-details">
          <FormInput
            label="Warehouse Name"
            name="warehouse_name"
            value={formData.warehouse_name}
            onChange={handleChange}
            error={errors.warehouse_name}
          />
          <FormInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />
          <FormInput
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
          />
          <FormInput
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            error={errors.country}
          />
        </div>

        <div className="contact-details">
          <FormInput
            label="Contact Name"
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
            error={errors.contact_name}
          />
          <FormInput
            label="Contact Position"
            name="contact_position"
            value={formData.contact_position}
            onChange={handleChange}
            error={errors.contact_position}
          />
          <FormInput
            label="Contact Phone"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            error={errors.contact_phone}
          />
          <FormInput
            label="Contact Email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            error={errors.contact_email}
            type="email"
          />
        </div>
      </section>

      <div className="form-actions">
        <button type="submit" className="save-button">
          Save Changes
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditWarehouse;
