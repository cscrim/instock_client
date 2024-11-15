import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import "./EditInventory.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

const EditInventory = () => {
  const { inventoryId } = useParams();
  const navigate = useNavigate();

  const [inventory, setInventory] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "",
    quantity: "",
    warehouse_id: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/inventory/${inventoryId}`
        );
        setInventory(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [inventoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventory((prevInventory) => ({
      ...prevInventory,
      [name]: value,
    }));
  };

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
        inventory,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 404) {
        setError("Inventory item not found.");
        return;
      }

      // Redirect to the inventory details page after a successful update
      navigate(`/inventory/${inventoryId}`);
    } catch (err) {
      setError("An error occurred while updating the inventory item.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="edit-inventory">
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
          <input
            type="text"
            id="category"
            name="category"
            value={inventory.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={inventory.status}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
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
        <div className="form-group">
          <label htmlFor="warehouse_id">Warehouse ID</label>
          <input
            type="number"
            id="warehouse_id"
            name="warehouse_id"
            value={inventory.warehouse_id}
            onChange={handleChange}
            required
          />
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
