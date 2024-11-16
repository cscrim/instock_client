import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddInventory.scss";

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

const AddInventory = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "out_of_stock", // Default to "out_of_stock"
    quantity: "",
    warehouse_name: "",
  });

  const [categories, setCategories] = useState([]); // List of categories
  const [warehouses, setWarehouses] = useState([]); // List of warehouses
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // Fetch categories and warehouses for the dropdown lists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, warehousesRes] = await Promise.all([
          axios.get("http://localhost:8080/inventory/categories"), // Modify with correct endpoint
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

  // Validation function
  const validate = () => {
    let tempErrors = {};

    // Check for required fields
    for (let field in formData) {
      if (!formData[field].trim() && field !== "quantity") {
        tempErrors[field] = "This field is required";
      }
    }

    // Custom validation for quantity (only when "in_stock")
    if (formData.status === "in_stock" && !formData.quantity) {
      tempErrors.quantity =
        "Quantity is required when the status is 'In Stock'";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setErrors({});
  //   setLoading(true);

  //   if (validate()) {
  //     try {
  //       await axios.post("http://localhost:8080/inventories", formData);
  //       setSuccess("Inventory item added successfully");
  //       setFormData({
  //         item_name: "",
  //         description: "",
  //         category: "",
  //         status: "out_of_stock",
  //         quantity: "",
  //         warehouse_name: "",
  //       });
  //       navigate("/inventory");
  //     } catch (error) {
  //       console.error("Error adding inventory", error);
  //       setErrors({ submit: "Failed to add inventory" });
  //     }
  //   }
  //   setLoading(false);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);
  
    if (validate()) {
      try {
        const warehouseName = formData.warehouse_name;  // Now it's directly the warehouse_id
  
        if (!warehouseName) {
          throw new Error("Warehouse not found");
        }
  
        // Prepare the data to send to the backend
        const dataToSubmit = {
          ...formData,
          warehouse_name: warehouseName,  // Send the warehouse_id directly
        };
  
        console.log("Data to submit:", dataToSubmit);  // For debugging
  
        // Send POST request to the backend
        await axios.post("http://localhost:8080/inventory", dataToSubmit);
        setSuccess("Inventory item added successfully");
  
        // Reset form fields
        setFormData({
          item_name: "",
          description: "",
          category: "",
          status: "out_of_stock",
          quantity: "",
          warehouse_name: "", // Reset warehouse_name as it's actually the warehouse_id now
        });
  
        navigate("/inventory");
      } catch (error) {
        console.error("Error adding inventory:", error.response || error.message);
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
    <div className="add-inventory-container">
      <h2>Add New Inventory Item</h2>

      {errors.submit && <div className="error-message">{errors.submit}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <section className="form__details">
          <div className="inventory-details">
            <h3>Inventory Details</h3>
            <FormInput
              label="Item Name"
              name="item_name"
              value={formData.item_name}
              onChange={handleChange}
              error={errors.item_name}
            />
            <FormInput
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
            />

            {/* Category Dropdown */}
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                aria-label="Category"
                className={errors.category ? "error" : ""}
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

            {/* Status Radio Buttons */}
            <div className="form-group">
              <label>Status</label>
              <div>
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

            {/* Quantity (conditional on "In Stock" selection) */}
            {formData.status === "in_stock" && (
              <FormInput
                label="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                error={errors.quantity}
                type="number"
              />
            )}
          </div>

          <div className="warehouse-details">
            <h3>Warehouse</h3>
            {/* Warehouse Name Dropdown */}
            <div className="form-group">
              <label>Warehouse</label>

              {/* <select
                name="warehouse_name"
                value={formData.warehouse_name}
                onChange={handleChange}
                aria-label="Warehouse"
                className={errors.warehouse_name ? "error" : ""}
              >
                <option value="">Select Warehouse</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.warehouse_name}
                  </option>
                ))}
              </select> */}



              <select
                name="warehouse_name" // Keep this name for form handling
                value={formData.warehouse_name} // This will now hold the warehouse_id
                onChange={handleChange}
                aria-label="Warehouse"
                className={errors.warehouse_name ? "error" : ""}
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
            {loading ? "Adding Inventory..." : "Add Inventory"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInventory;
