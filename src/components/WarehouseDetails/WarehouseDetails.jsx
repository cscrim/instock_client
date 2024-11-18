import React from "react";
import { Link } from "react-router-dom";
import InventoryList from "../InventoryList/InventoryList"; // Import InventoryList
import editIcon from "../../assets/Icons/edit-white-24px.svg";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import "./WarehouseDetails.scss";

const WarehouseDetails = ({ warehouse, inventory, onEdit }) => {
  const handleDelete = (itemId, itemName) => {
    // Placeholder for delete logic
    console.log(`Delete ${itemName} with ID ${itemId}`);
  };

  return (
    <div className="warehouse-details">
      <div className="warehouse-details__header">
        <div className="warehouse-details__name">
          {/* Wrap back arrow in a Link to redirect to the Warehouse page */}
          <Link to="/" className="warehouse-details__back-link">
            <img
              src={backArrow}
              className="warehouse-details__back-button"
              alt="Back arrow"
            />
          </Link>
          <h1>{warehouse.warehouse_name}</h1>
        </div>

        {/* Link for editing warehouse */}
        <Link
          to={`/warehouses/edit/${warehouse.id}`}
          className="warehouse-details__edit-link"
        >
          <button className="warehouse-details__edit-button">
            <img
              src={editIcon}
              className="edit-button__icon"
              alt="edit pencil icon"
            />
          </button>
          <div className="warehouse-details__edit-button--tablet">
            <img
              src={editIcon}
              className="edit-button__icon"
              alt="edit pencil icon"
            />
            Edit
          </div>
        </Link>
      </div>

      <div className="warehouse-details__content">
        <div className="content__address">
          <h4 className="content__title">WAREHOUSE ADDRESS:</h4>
          <div>{warehouse.address},</div>
          <div>
            {warehouse.city}, {warehouse.country}
          </div>
        </div>
        <div className="content__contact-box">
          <div className="content__contact-name">
            <h4 className="content__title">CONTACT NAME:</h4>
            <div>{warehouse.contact_name}</div>
            <div>{warehouse.contact_position}</div>
          </div>

          <div className="content__contact-info">
            <h4 className="content__title">CONTACT EMAIL:</h4>
            <div>{warehouse.contact_phone}</div>
            <div>{warehouse.contact_email}</div>
          </div>
        </div>
      </div>

      <div className="warehouse-details__inventory">
        <h2 className="inventory__title">Inventory</h2>
        <InventoryList
          inventoryItems={inventory} // Pass inventory items
          onDelete={handleDelete} // Optional delete handler
          hideWarehouseColumn={true} // Hide the warehouse column on this page
        />
      </div>
    </div>
  );
};

export default WarehouseDetails;
