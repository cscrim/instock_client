import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./WarehouseList.scss"; // Updated styling
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import chevronIcon from "../../assets/Icons/chevron_right-24px.svg";
import sortIcon from "../../assets/Icons/sort-24px.svg";

const WarehouseList = ({ warehouses, onDelete }) => {
  // State to track if the view is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="warehouse-list">
      {/* Header row for tablet and desktop views */}
      <div className="warehouse-list__header-row">
        <div className="header-row__title-box">
          <div className="warehouse-list__header-item">WAREHOUSE</div>
          <img src={sortIcon} alt="sort icon" className="sort-icon" />
        </div>
        <div className="header-row__title-box">
          <div className="warehouse-list__header-item">ADDRESS</div>
          <img src={sortIcon} alt="sort icon" className="sort-icon" />
        </div>
        <div className="header-row__title-box">
          <div className="warehouse-list__header-item">CONTACT NAME</div>
          <img src={sortIcon} alt="sort icon" className="sort-icon" />
        </div>
        <div className="header-row__title-box">
          <div className="warehouse-list__header-item">CONTACT INFORMATION</div>
          <img src={sortIcon} alt="sort icon" className="sort-icon" />
        </div>
        <div className="warehouse-list__header-item">ACTIONS</div>
      </div>

      {/* Rows for warehouse items */}
      {warehouses.map((warehouse) => (
        <div key={warehouse.id} className="warehouse-list__row">
          {/* Conditional layout for mobile or larger screens */}
          {isMobile ? (
            <div className="warehouse-list__content-box">
              <div className="list-column">
                <div className="warehouse-list__item">
                  <div className="warehouse-list__header-item">WAREHOUSE</div>
                  <div className="item-box">
                    <Link
                      to={`/warehouses/details/${warehouse.id}`}
                      className="warehouse-list__name-link"
                    >
                      {warehouse.warehouse_name}
                    </Link>
                    <img
                      src={chevronIcon}
                      className="item-chevron"
                      alt="chevron icon pointing right"
                    />
                  </div>
                </div>
                <div className="warehouse-list__item">
                  <div className="warehouse-list__header-item mobile-only">
                    ADDRESS
                  </div>
                  <div>
                    {warehouse.address}, {warehouse.city}, {warehouse.country}
                  </div>
                </div>
              </div>
              <div className="list-column">
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
                  <div>{warehouse.contact_phone}</div>
                  <div>{warehouse.contact_email}</div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="warehouse-list__item">
                <div className="item-box">
                  <Link
                    to={`/warehouse/details/${warehouse.id}`}
                    className="warehouse-list__name-link"
                  >
                    {warehouse.warehouse_name}
                  </Link>
                  <img
                    src={chevronIcon}
                    className="item-chevron"
                    alt="chevron icon pointing right"
                  />
                </div>
              </div>
              <div className="warehouse-list__item">
                {warehouse.address}, {warehouse.city}, {warehouse.country}
              </div>
              <div className="warehouse-list__item">
                {warehouse.contact_name}
              </div>
              <div className="warehouse-list__item">
                <div>{warehouse.contact_phone}</div>
                <div>{warehouse.contact_email}</div>
              </div>
            </>
          )}
          <div className="warehouse-list__item warehouse-list__item--actions">
            <button
              className="warehouse-list__button"
              onClick={() => onDelete(warehouse.id, warehouse.warehouse_name)}
            >
              <img src={deleteIcon} alt="delete trashcan icon" />
            </button>
            <Link
              to={`/warehouses/edit/${warehouse.id}`}
              className="warehouse-list__button"
            >
              <img src={editIcon} alt="edit pencil icon" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WarehouseList;
