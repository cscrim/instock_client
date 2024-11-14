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
        <div className="warehouse-list__header-item">WAREHOUSE</div>
        <div className="warehouse-list__header-item">ADDRESS</div>
        <div className="warehouse-list__header-item">CONTACT NAME</div>
        <div className="warehouse-list__header-item">CONTACT INFORMATION</div>
        <div className="warehouse-list__header-item">ACTIONS</div>
      </div>

      {warehouses.map((warehouse) => (
        <div key={warehouse.id} className="warehouse-list__row">
          <div className="warehouse-list__item">
            <div className="warehouse-list__header-item mobile-only">
              WAREHOUSE
            </div>
            <div>{warehouse.warehouse_name}</div>
          </div>
          <div className="warehouse-list__item">
            <div className="warehouse-list__header-item mobile-only">
              ADDRESS
            </div>
            <div>{warehouse.address}</div>
          </div>
          <div className="warehouse-list__item">
            <div className="warehouse-list__header-item mobile-only">
              CONTACT NAME
            </div>
            <div>{warehouse.contact_name}</div>
          </div>
          <div className="warehouse-list__item">
            <div className="warehouse-list__header-item mobile-only">
              CONTACT INFORMATION
            </div>
            <div>{warehouse.contact_email}</div>
          </div>

          <div className="warehouse-list__item warehouse-list__item--right">
            <div className="warehouse-list__header-item warehouse-list__header-item--mobile">
              ACTIONS
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
