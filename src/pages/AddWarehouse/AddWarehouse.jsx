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

            {[
              { label: "Warehouse Name", name: "warehouse_name" },
              { label: "Address", name: "address" },
              { label: "City", name: "city" },
              { label: "Country", name: "country" },
            ].map(({ label, name }) => (
              <div className="form-group" key={name}>
                <label htmlFor={name}>{label}</label>
                <input
                  type="text"
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  // required
                />
                {errors[name] && <p className="error">{errors[name]}</p>}
              </div>
            ))}
          </div>

          <div className="contact-details__container">
            <div className="contact-details">
              <h2>Contact Details</h2>

              {[
                { label: "Contact Name", name: "contact_name" },
                { label: "Contact Position", name: "contact_position" },
                { label: "Contact Phone", name: "contact_phone", type: "tel" },
                {
                  label: "Contact Email",
                  name: "contact_email",
                  type: "email",
                },
              ].map(({ label, name, type = "text" }) => (
                <div className="form-group" key={name}>
                  <label htmlFor={name}>{label}</label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    // required
                  />
                  {errors[name] && <p className="error">{errors[name]}</p>}
                </div>
              ))}
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
