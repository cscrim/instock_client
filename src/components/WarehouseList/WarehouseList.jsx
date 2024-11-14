// src/components/WarehouseList.jsx
import React from "react";
import "./WarehouseList.scss";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";

const WarehouseList = ({ warehouses, onDelete }) => {
  return (
    <div className="warehouse-list">
      {/* Header row for tablet and desktop view */}
      <div className="warehouse-list__header-row">
        <div className="warehouse-list__header-item">Warehouse</div>
        <div className="warehouse-list__header-item">Address</div>
        <div className="warehouse-list__header-item">Contact</div>
        <div className="warehouse-list__header-item">Actions</div>
      </div>

      {warehouses.map((warehouse) => (
        <div key={warehouse.id} className="warehouse-list__row">
          <div className="warehouse-list__item">
            <div className="warehouse-list__header-item mobile-only">
              Warehouse
            </div>
            <div>{warehouse.warehouse_name}</div>
          </div>
          <div className="warehouse-list__item">
            <div className="warehouse-list__header-item mobile-only">
              Address
            </div>
            <div>{warehouse.address}</div>
          </div>
          <div className="warehouse-list__item">
            <div className="warehouse-list__header-item mobile-only">
              Contact
            </div>
            <div>{warehouse.contact_name}</div>
            <div>{warehouse.contact_email}</div>
          </div>
          <div className="warehouse-list__item">
            <div className="warehouse-list__header-item mobile-only">
              Actions
            </div>
            <button
              className="warehouse-list__button"
              onClick={() => onDelete(warehouse.id)}
            >
              <img src={deleteIcon} alt="delete trashcan icon" />
            </button>
            <button className="warehouse-list__button">
              <img src={editIcon} alt="edit pencil icon" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WarehouseList;
