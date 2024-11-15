import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import editIcon from "../../assets/Icons/edit-24px.svg";
import "./InventoryDetails.scss";

const BASE_URL = import.meta.env.VITE_API_URL;

const InventoryDetails = () => {
  const { inventoryId } = useParams();
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`${BASE_URL}/inventory/${inventoryId}`);
        if (!response.ok) throw new Error("Could not fetch inventory item");
        const data = await response.json();
        setInventory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [inventoryId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!inventory) {
    return <p>No inventory found</p>;
  }

  return (
    <div className="inventory-details">
      <header className="inventory-details__header">
        <div className="inventory-details__icon-left">
          <editIcon className="edit-icon" />
        </div>
        <h1 className="inventory-details__title">{inventory.item_name}</h1>
        <div className="inventory-details__icon-right">
          {/* Add any other icon you want to display here */}
          <i className="icon-other"></i>
        </div>
      </header>

      <div className="inventory-details__info">
        <p>
          <span className="label">Item Description:</span>{" "}
          {inventory.description}
        </p>
        <p>
          <span className="label">Category:</span> {inventory.category}
        </p>
        <p>
          <span className="label">Status:</span>
          <span
            className={`status ${
              inventory.status === "In Stock" ? "status--in-stock" : ""
            }`}
          >
            {inventory.status}
          </span>
        </p>
        <p>
          <span className="label">Quantity:</span> {inventory.quantity}
        </p>
        <p>
          <span className="label">Warehouse:</span> {inventory.warehouse_name}
        </p>
      </div>
    </div>
  );
};

export default InventoryDetails;
