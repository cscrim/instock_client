// src/components/WarehouseList.jsx
import React from "react";

const WarehouseList = ({ warehouses, onDelete }) => {
  return (
    <div className="warehouse-list">
      <ul className="warehouse-list__header">
        <li>Name</li>
        <li>Address</li>
        <li>Contact</li>
        <li>Actions</li>
      </ul>
      {warehouses.map((warehouse) => (
        <ul key={warehouse.id} className="warehouse-list__row">
          <li>{warehouse.warehouse_name}</li>
          <li>{warehouse.address}</li>
          <li>
            {warehouse.contact_name} - {warehouse.contact_email}
          </li>
          <li>
            <button onClick={() => onDelete(warehouse.id)}>🗑️</button>
            <button>Edit</button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default WarehouseList;
