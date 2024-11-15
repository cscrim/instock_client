// src/components/InventoryDetails.jsx
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import editIcon from "../../assets/Icons/edit-white-24px.svg";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import "./InventoryDetails.scss";
const BASE_URL = import.meta.env.VITE_API_URL;

const InventoryDetails = ({ inventory }) => {
  return (
    <div className="inventory-details">
      <div className="inventory-details__header">
        <div className="inventory-details__name">
          {/* Wrap back arrow in a Link to redirect to the Inventory page */}
          <Link to="/inventory" className="inventory-details__back-link">
            <img
              src={backArrow}
              className="inventory-details__back-button"
              alt="Back arrow"
            />
          </Link>
          <h1>{inventory.product_name}</h1>
        </div>

        {/* Link for editing inventory */}
        <Link
          to={`${BASE_URL}/inventory/edit/${inventory.id}`}
          className="inventory-details__edit-link"
        >
          <button className="inventory-details__edit-button">
            <img
              src={editIcon}
              className="edit-button__icon"
              alt="Edit pencil icon"
            />
          </button>
        </Link>

        <Link
          to={`${BASE_URL}/inventory/edit/${inventory.id}`}
          className="inventory-details__edit-link--tablet"
        >
          <button className="inventory-details__edit-button--tablet">
            <img
              src={editIcon}
              className="edit-button__icon"
              alt="Edit pencil icon"
            />
            Edit
          </button>
        </Link>
      </div>

      <div className="inventory-details__content">
        <div className="content__product-info">
          <h4 className="content__title">PRODUCT NAME:</h4>
          <div>{inventory.product_name}</div>
        </div>

        <div className="content__quantity">
          <h4 className="content__title">QUANTITY IN STOCK:</h4>
          <div>{inventory.quantity_in_stock}</div>
        </div>

        <div className="content__warehouse">
          <h4 className="content__title">WAREHOUSE LOCATION:</h4>
          <div>{inventory.warehouse_name}</div>
          <div>{inventory.warehouse_address}</div>
        </div>

        <div className="content__supplier">
          <h4 className="content__title">SUPPLIER DETAILS:</h4>
          <div>{inventory.supplier_name}</div>
          <div>{inventory.supplier_contact}</div>
        </div>

        <div className="content__price">
          <h4 className="content__title">UNIT PRICE:</h4>
          <div>${inventory.unit_price}</div>
        </div>

        <div className="content__value">
          <h4 className="content__title">TOTAL INVENTORY VALUE:</h4>
          <div>
            ${(inventory.quantity_in_stock * inventory.unit_price).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryDetails;
