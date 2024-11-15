// src/components/WarehouseDetails.jsx
import React from "react";
import editIcon from "../../assets/Icons/edit-white-24px.svg";
import "./WarehouseDetails.scss"; // Add icon for editing
import backArrow from "../../assets/Icons/arrow_back-24px.svg";

const WarehouseDetails = ({ warehouse, onEdit }) => {
  return (
    <div className="warehouse-details">
      <div className="warehouse-details__header">
        <div className="warehouse-details__name">
          <img src={backArrow} className="warehouse-details__back-button" />
          <h1>{warehouse.warehouse_name}</h1>
        </div>
        <button
          className="warehouse-details__edit-button"
          onClick={() => onEdit(warehouse)}
        >
          <img src={editIcon} alt="edit pencil icon" />
        </button>
      </div>
      <div className="warehouse-details__content">
        <div className="content__address">
          <h4 className="content__title">Address:</h4> {warehouse.address}
        </div>
        <div className="content__contact-box">
          <div className="content__contact-name">
            <h4 className="content__title">Contact Name:</h4>
            <div>{warehouse.contact_name}</div>
            <div>{warehouse.contact_position}</div>
          </div>

          <div className="content__contact-info">
            <h4 className="content__title">Contact Email:</h4>
            <div>{warehouse.contact_phone}</div>
            <div>{warehouse.contact_email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDetails;
