import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddWarehouse.scss";

// Reusable FormInput component for error handling
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

const AddWarehouse = () => {
  const navigate = useNavigate();

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

  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Validation function
  const validate = () => {
    let tempErrors = {};
    const phoneRegex =
      /^\+?(\d{1,3})?[-.\s]?(\(\d{1,3}\)|\d{1,3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check for required fields
    for (let field in formData) {
      if (!formData[field].trim()) {
        tempErrors[field] = "This field is required";
      }
    }

    // Custom validations
    if (formData.contact_phone && !phoneRegex.test(formData.contact_phone)) {
      tempErrors.contact_phone = "Invalid phone number format";
    }
    if (formData.contact_email && !emailRegex.test(formData.contact_email)) {
      tempErrors.contact_email = "Invalid email format";
    }

    setError(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (validate()) {
      try {
        await axios.post("http://localhost:8080/warehouses", formData);
        setSuccess("Warehouse added successfully");
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
        navigate("/warehouses");
      } catch (error) {
        console.log("Error adding warehouse", error);
        setErrors({ submit: "Failed to add warehouse" });
      }
    }
    setLoading(false);
  };

  const handleCancel = () => {
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
      navigate("/warehouses");
    }
  };

  return (
    <div className="add-warehouse-container">
      <h2>Add New Warehouse</h2>

      {errors.submit && <div className="error-message">{errors.submit}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <section className="form__details">
          <div className="warehouse-details">
            <h3>
              Warehouse Details
            </h3>
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
            <h3>
              Contact Details
            </h3>
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
        <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Adding Warehouse..." : "Add Warehouse"}
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default AddWarehouse;
