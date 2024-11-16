import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import "./EditInventory.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

const EditInventory = () => {
  const { inventoryId } = useParams(); // Get inventoryId from URL
  const navigate = useNavigate(); // For navigating to other pages

  // State for inventory data, loading/error states, and warehouse list
  const [inventory, setInventory] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "",
    quantity: "",
    warehouse_id: "",
  });
  const [warehouses, setWarehouses] = useState([]); // Warehouse options
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch inventory data and warehouse list
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch inventory data
        const inventoryResponse = await axios.get(
          `${BASE_URL}/inventory/${inventoryId}`
        );
        setInventory(inventoryResponse.data);

        // Fetch warehouse list
        const warehouseResponse = await axios.get(`${BASE_URL}/warehouses`);
        setWarehouses(warehouseResponse.data);
      } catch (err) {
        setError("An error occurred while fetching the data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inventoryId]);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventory((prevInventory) => ({
      ...prevInventory,
      [name]: value,
    }));
  };

  // Handle form submission (update the inventory)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const { item_name, description, category, status, quantity, warehouse_id } =
      inventory;
    if (
      !item_name ||
      !description ||
      !category ||
      !status ||
      quantity === "" ||
      !warehouse_id
    ) {
      setError("All fields are required.");
      return;
    }
    if (isNaN(quantity)) {
      setError("Quantity must be a number.");
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/inventory/${inventoryId}`,
        inventory
      );

      // Handle error if item not found during update
      if (response.status === 404) {
        setError("Inventory item not found.");
        return;
      }

      // Redirect to updated inventory details
      navigate(`/inventory/${inventoryId}`);
    } catch (err) {
      setError("An error occurred while updating the inventory item.");
    }
  };

  // Loading and error handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="edit-inventory">
      <Link to="/inventory" className="inventory-details__back-link">
        <img
          src={backArrow}
          className="inventory-details__back-button"
          alt="Back arrow"
        />
      </Link>

      <h1>Edit Inventory Item</h1>

      <form onSubmit={handleSubmit} className="edit-inventory-form">
        <div className="form-group">
          <label htmlFor="item_name">Item Name</label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            value={inventory.item_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={inventory.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={inventory.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <h2>Item Availability</h2>
        <div className="status-options">
          <label>
            <input
              type="radio"
              name="status"
              value="In Stock"
              checked={inventory.status === "In Stock"}
              onChange={handleChange}
            />
            In Stock
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="Out of Stock"
              checked={inventory.status === "Out of Stock"}
              onChange={handleChange}
            />
            Out of Stock
          </label>
        </div>

        {inventory.status === "In Stock" && (
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={inventory.quantity}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="warehouse_id">Warehouse Name</label>
        </div>

        {error && <p className="error-message">{error}</p>}
        <div className="form-buttons">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cancel-button"
          >
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInventory;
