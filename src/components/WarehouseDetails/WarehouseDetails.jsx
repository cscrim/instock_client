// src/components/WarehouseDetails.jsx
import React from "react";
import editIcon from "../../assets/Icons/edit-24px.svg"; // Add icon for editing

const WarehouseDetails = ({ warehouse, onEdit }) => {
  return (
    <div className="warehouse-details">
      <div className="warehouse-details__header">
        <h1>{warehouse.warehouse_name}</h1>
        <button onClick={() => onEdit(warehouse)}>
          <img src={editIcon} alt="Edit Warehouse" />
        </button>
      </div>
      <div className="warehouse-details__content">
        <div>
          <strong>Address:</strong> {warehouse.address}
        </div>
        <div>
          <strong>Contact Name:</strong> {warehouse.contact_name}
        </div>
        <div>
          <strong>Contact Email:</strong> {warehouse.contact_email}
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetails;
