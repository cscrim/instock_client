import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import editIcon from "../../assets/Icons/edit-white-24px.svg";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
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
      <div className="inventory-details__header">
        <div className="inventory-details__back-and-title">
          <Link to="/inventory" className="inventory-details__back-link">
            <img
              src={backArrow}
              className="inventory-details__back-button"
              alt="Back arrow"
            />
          </Link>
          <h1>{inventory.item_name}</h1>
        </div>

        <Link
          to={`/inventory/edit/${inventory.id}`}
          className="inventory-details__edit-link"
        >
          <button className="inventory-details__edit-button">
            <img src={editIcon} className="edit-button__icon" alt="edit icon" />
            <p className="edit-button__text">Edit</p>
          </button>
        </Link>
      </div>

      <div className="inventory-details__content">
        <div className="content__product-info">
          <h4 className="content__title">ITEM DESCRIPTION:</h4>
          <div>{inventory.description}</div>
        </div>

        <div className="content__category">
          <h4 className="content__title">CATEGORY:</h4>
          <div>{inventory.category}</div>
        </div>

        <div className="content__status-quantity">
          <div className="content__status">
            <h4 className="content__title">STATUS:</h4>
            <div
              className={`status-badge ${inventory.status
                .toLowerCase()
                .replace(/\s/g, "-")}`}
            >
              {inventory.status}
            </div>
          </div>

          <div className="content__quantity">
            <h4 className="content__title">QUANTITY:</h4>
            <div>{inventory.quantity}</div>
          </div>
        </div>

        <div className="content__warehouse">
          <h4 className="content__title">WAREHOUSE:</h4>
          <div>{inventory.warehouse_name}</div>
          <div>{inventory.warehouse_address}</div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetails;
