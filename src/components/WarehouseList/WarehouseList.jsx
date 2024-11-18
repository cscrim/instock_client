import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./WarehouseList.scss";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import chevronIcon from "../../assets/Icons/chevron_right-24px.svg";
import sortIcon from "../../assets/Icons/sort-24px.svg";

const WarehouseList = ({ warehouses, onDelete }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="warehouse-list">
      {isMobile ? (
        // Mobile view
        warehouses.map((warehouse) => (
          <div className="inventory-list__box">
            <div key={warehouse.id} className="warehouse-list__content-box">
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
                  <div className="warehouse-list__header-item">ADDRESS</div>
                  <div>
                    {warehouse.address}, {warehouse.city}, {warehouse.country}
                  </div>
                </div>
              </div>
              <div className="list-column">
                <div className="warehouse-list__item">
                  <div className="warehouse-list__header-item">
                    CONTACT NAME
                  </div>
                  <div>{warehouse.contact_name}</div>
                </div>
                <div className="warehouse-list__item">
                  <div className="warehouse-list__header-item">
                    CONTACT INFORMATION
                  </div>
                  <div>{warehouse.contact_phone}</div>
                  <div>{warehouse.contact_email}</div>
                </div>
              </div>
            </div>
            <div className="warehouse-list__item warehouse-list__item--actions">
              <button
                className="warehouse-list__button"
                onClick={() => onDelete(warehouse.id, warehouse.warehouse_name)}
              >
                <img
                  src={deleteIcon}
                  alt="delete trashcan icon"
                  className="button__delete-icon"
                />
              </button>
              <Link
                to={`/warehouses/edit/${warehouse.id}`}
                className="warehouse-list__button"
              >
                <img
                  src={editIcon}
                  alt="edit pencil icon"
                  className="button__edit-icon"
                />
              </Link>
            </div>
          </div>
        ))
      ) : (
        // Tablet/Desktop view as a table
        <table className="warehouse-list__table">
          <thead>
            <tr>
              <th>
                <div className="header-title">
                  WAREHOUSE
                  <img src={sortIcon} alt="sort icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="header-title">
                  ADDRESS
                  <img src={sortIcon} alt="sort icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="header-title">
                  CONTACT NAME
                  <img src={sortIcon} alt="sort icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="header-title">
                  CONTACT INFORMATION
                  <img src={sortIcon} alt="sort icon" className="sort-icon" />
                </div>
              </th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse) => (
              <tr key={warehouse.id}>
                <td>
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
                </td>
                <td>
                  {warehouse.address}, {warehouse.city}, {warehouse.country}
                </td>
                <td>{warehouse.contact_name}</td>
                <td>
                  <div>{warehouse.contact_phone}</div>
                  <div>{warehouse.contact_email}</div>
                </td>
                <td className="td__actions-box">
                  <button
                    className="warehouse-list__button"
                    onClick={() =>
                      onDelete(warehouse.id, warehouse.warehouse_name)
                    }
                  >
                    <img
                      src={deleteIcon}
                      alt="delete trashcan icon"
                      className="button__delete-icon"
                    />
                  </button>
                  <Link
                    to={`/warehouses/edit/${warehouse.id}`}
                    className="warehouse-list__button"
                  >
                    <img
                      src={editIcon}
                      alt="edit pencil icon"
                      className="button__edit-icon"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WarehouseList;
