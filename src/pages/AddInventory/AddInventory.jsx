import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import axios from "axios";
import "./AddInventory.scss";


// const FormInput = ({ label, name, value, onChange, error, type = "text" }) => (
//   <div className="form-group">
//     <label>{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       aria-label={label}
//       className={error ? "error" : ""}
//     />
//     {error && <p className="error">{error}</p>}
//   </div>
// );

const AddInventory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "out_of_stock", 
    quantity: "",
    warehouse_name: "",
  });

  const [categories, setCategories] = useState([]); 
  const [warehouses, setWarehouses] = useState([]); 
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, warehousesRes] = await Promise.all([
          axios.get("http://localhost:8080/inventory/categories"), 
          axios.get("http://localhost:8080/warehouses"),
        ]);
        setCategories(categoriesRes.data);
        setWarehouses(warehousesRes.data);
      } catch (error) {
        console.error("Error fetching categories or warehouses:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRadioChange = (event) => {
    setFormData({
      ...formData,
      status: event.target.value,
      quantity: event.target.value === "in_stock" ? formData.quantity : "", // Reset quantity if out_of_stock
    });
  };

  const validate = () => {
    let tempErrors = {};

    for (let field in formData) {
      if (!formData[field].trim() && field !== "quantity") {
        tempErrors[field] = "This field is required";
      }
    }

    if (formData.status === "in_stock" && !formData.quantity) {
      tempErrors.quantity =
        "Quantity is required when the status is 'In Stock'";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);

    if (validate()) {
      try {
        const warehouseName = formData.warehouse_name; // Now it's directly the warehouse_id

        if (!warehouseName) {
          throw new Error("Warehouse not found");
        }

       
        const dataToSubmit = {
          ...formData,
          warehouse_name: warehouseName, 
        };

        console.log("Data to submit:", dataToSubmit); 

        
        await axios.post("http://localhost:8080/inventory", dataToSubmit);
        setSuccess("Inventory item added successfully");

        // Reset form fields
        setFormData({
          item_name: "",
          description: "",
          category: "",
          status: "out_of_stock",
          quantity: "",
          warehouse_name: "",
        });

        navigate("/inventory");
      } catch (error) {
        console.error(
          "Error adding inventory:",
          error.response || error.message
        );
        setErrors({ submit: "Failed to add inventory" });
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
        item_name: "",
        description: "",
        category: "",
        status: "out_of_stock",
        quantity: "",
        warehouse_name: "",
      });
      navigate("/inventory");
    }
  };

  return (
    <div className="add-inventory">
      <div className="add-inventory__header">
        <Link to="/inventory" className="add-inventory__back-link">
          <img
            src={backArrow}
            className="add-inventory__back-button"
            alt="Back arrow"
          />
        </Link>
        <h1>Add New Inventory Item</h1>
      </div>

      {errors.submit && <div className="error-message">{errors.submit}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit} className="add-inventory-form">
        <div className="item-details__container">
          <div className="item-details">
            <h2>Item Details</h2>
            <div className="form-group">
              <label htmlFor="item_name">Item Name</label>
              <input
                type="text"
                id="item_name"
                name="item_name"
                value={formData.item_name}
                onChange={handleChange}
                required
              />
              {errors.item_name && <p className="error">{errors.item_name}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              {errors.description && <p className="error">{errors.description}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.category} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="error">{errors.category}</p>}
            </div>
          </div>

          <div className="item-availability__container">
            <div className="item-availability">
              <h2>Item Availability</h2>

              <div className="status-options">
                <p>Status</p>
                <div className="status-options__buttons">
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="in_stock"
                    checked={formData.status === "in_stock"}
                    onChange={handleRadioChange}
                  />
                  In Stock
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="out_of_stock"
                    checked={formData.status === "out_of_stock"}
                    onChange={handleRadioChange}
                  />
                  Out of Stock
                </label>
                </div>
                {errors.status && <p className="error">{errors.status}</p>}
              </div>

              {formData.status === "in_stock" && (
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                  {errors.quantity && <p className="error">{errors.quantity}</p>}
                </div>
              )}
            </div>

            <div className="warehouse-details">
              <h3>Warehouse</h3>
              <div className="form-group">
                <label htmlFor="warehouse_name">Warehouse Name</label>
                <select
                  id="warehouse_name"
                  name="warehouse_name"
                  value={formData.warehouse_name}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Warehouse</option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.warehouse_name}>
                      {warehouse.warehouse_name}
                    </option>
                  ))}
                </select>
                {errors.warehouse_name && (
                  <p className="error">{errors.warehouse_name}</p>
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
            + Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventory;