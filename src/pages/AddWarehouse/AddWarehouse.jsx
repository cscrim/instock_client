import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import "./AddWarehouse.scss";

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


  const validate = () => {
    let tempErrors = {};
    const phoneRegex =
      /^\+?(\d{1,3})?[-.\s]?(\(\d{1,3}\)|\d{1,3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (let field in formData) {
      if (!formData[field].trim()) {
        tempErrors[field] = "This field is required";
      }
    }

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
        setError({ submit: "Failed to add warehouse" });
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

    <div className="add-warehouse">
      <div className="add-warehouse__header">
        <Link to="/warehouses" className="add-warehouse__back-link">
          <img
            src={backArrow}
            className="add-warehouse__back-button"
            alt="Back arrow"
          />
        </Link>
        <h1>Add New Warehouse</h1>
      </div>

      {errors.submit && <div className="error-message">{errors.submit}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="add-warehouse-form">
        <div className="warehouse-details__container">
          <div className="warehouse-details">
            <h2>Warehouse Details</h2>
            <div className="form-group">
              <label htmlFor="warehouse_name">Warehouse Name</label>
              <input
                type="text"
                id="warehouse_name"
                name="warehouse_name"
                value={formData.warehouse_name}
                onChange={handleChange}
                required
              />
              {errors.warehouse_name && (
                <p className="error">{errors.warehouse_name}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && <p className="error">{errors.address}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {errors.city && <p className="error">{errors.city}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
              {errors.country && <p className="error">{errors.country}</p>}
            </div>
          </div>

          <div className="contact-details__container">
            <div className="contact-details">
              <h2>Contact Details</h2>
              <div className="form-group">
                <label htmlFor="contact_name">Contact Name</label>
                <input
                  type="text"
                  id="contact_name"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  required
                />
                {errors.contact_name && (
                  <p className="error">{errors.contact_name}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact_position">Contact Position</label>
                <input
                  type="text"
                  id="contact_position"
                  name="contact_position"
                  value={formData.contact_position}
                  onChange={handleChange}
                  required
                />
                {errors.contact_position && (
                  <p className="error">{errors.contact_position}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact_phone">Contact Phone</label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  required
                />
                {errors.contact_phone && (
                  <p className="error">{errors.contact_phone}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="contact_email">Contact Email</label>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  required
                />
                {errors.contact_email && (
                  <p className="error">{errors.contact_email}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className="save-button" disabled={loading}>
            + Add Warehouse
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWarehouse;
