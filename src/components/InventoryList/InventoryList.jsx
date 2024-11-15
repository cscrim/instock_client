// src/components/InventoryList.jsx
import React from "react";
import "./InventoryList.scss";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";

const InventoryList = ({ inventoryItems, onDelete }) => {
  return (
    <div className="inventory-list">
      <div className="inventory-list__header-row">
        <div className="inventory-list__header-item">INVENTORY ITEM</div>
        <div className="inventory-list__header-item">CATEGORY</div>
        <div className="inventory-list__header-item">STATUS</div>
        <div className="inventory-list__header-item">QTY</div>
        <div className="inventory-list__header-item">WAREHOUSE</div>
        <div className="inventory-list__header-item">ACTIONS</div>
      </div>

      {inventoryItems.map((item) => (
        <div key={item.id} className="inventory-list__row">
          <div className="inventory-list__item">{item.item_name}</div>
          <div className="inventory-list__item">{item.category}</div>
          <div className="inventory-list__item">{item.status}</div>
          <div className="inventory-list__item">{item.quantity}</div>
          <div className="inventory-list__item">{item.warehouse_name}</div>
          <div className="inventory-list__item inventory-list__item--right">
            <button
              className="inventory-list__button"
              onClick={() => onDelete(item.id)}
            >
              <img src={deleteIcon} alt="delete icon" />
            </button>
            <button className="inventory-list__button">
              <img src={editIcon} alt="edit icon" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryList;
