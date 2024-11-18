import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./InventoryList.scss";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import chevronIcon from "../../assets/Icons/chevron_right-24px.svg";
import sortIcon from "../../assets/Icons/sort-24px.svg";

const InventoryList = ({ inventoryItems, hideWarehouseColumn, onDelete }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="inventory-list">
      {isMobile ? (
        // Mobile view
        inventoryItems.map((item) => (
          <div className="inventory-list__box">
            <div key={item.id} className="inventory-list__content-box">
              <div className="list-column">
                <div className="inventory-list__item">
                  <div className="inventory-list__header-item">ITEM NAME</div>
                  <div className="item-box">
                    <Link
                      to={`/inventory/details/${item.id}`}
                      className="inventory-list__name-link"
                    >
                      {item.item_name}
                    </Link>
                    <img
                      src={chevronIcon}
                      className="item-chevron"
                      alt="chevron icon pointing right"
                    />
                  </div>
                </div>
                <div className="inventory-list__item">
                  <div className="inventory-list__header-item">CATEGORY</div>
                  <div>{item.category}</div>
                </div>
              </div>
              <div className="list-column">
                <div className="inventory-list__item">
                  <div className="inventory-list__header-item">QUANTITY</div>
                  <div>{item.quantity}</div>
                </div>
                <div className="inventory-list__item">
                  <div className="inventory-list__header-item">STATUS</div>
                  <div
                    className={`item__${item.status.toLowerCase()} ${
                      item.status === "Out of Stock"
                        ? "item--outstock"
                        : "item--instock"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>
                {!hideWarehouseColumn && (
                  <div className="inventory-list__item">
                    <div className="inventory-list__header-item">WAREHOUSE</div>
                    <div>{item.warehouse_name}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="inventory-list__item inventory-list__item--actions">
              {/* <div className="inventory-list__header-item">ACTIONS</div> */}
              <button
                className="inventory-list__button"
                onClick={() => onDelete(item.id, item.name)}
              >
                <img
                  src={deleteIcon}
                  alt="delete trashcan icon"
                  className="button__delete-icon"
                />
              </button>
              <Link
                to={`/inventory/edit/${item.id}`}
                className="inventory-list__button"
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
        <table className="inventory-list__table">
          <thead>
            <tr>
              <th>
                <div className="header-title">
                  ITEM NAME
                  <img src={sortIcon} alt="sort icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="header-title">
                  CATEGORY
                  <img src={sortIcon} alt="sort icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="header-title">
                  QUANTITY
                  <img src={sortIcon} alt="sort icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="header-title">
                  STATUS
                  <img src={sortIcon} alt="sort icon" className="sort-icon" />
                </div>
              </th>
              {!hideWarehouseColumn && (
                <th>
                  <div className="header-title">
                    WAREHOUSE
                    <img src={sortIcon} alt="sort icon" className="sort-icon" />
                  </div>
                </th>
              )}
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="item-box">
                    <Link
                      to={`/inventory/details/${item.id}`}
                      className="inventory-list__name-link"
                    >
                      {item.item_name}
                    </Link>
                    <img
                      src={chevronIcon}
                      className="item-chevron"
                      alt="chevron icon pointing right"
                    />
                  </div>
                </td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>
                  <span
                    className={`item__${item.status.toLowerCase()} ${
                      item.status === "Out of Stock"
                        ? "item--outstock"
                        : "item--instock"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                {!hideWarehouseColumn && <td>{item.warehouse_name}</td>}
                <td className="td__actions-box">
                  <button
                    className="inventory-list__button"
                    onClick={() => onDelete(item.id, item.name)}
                  >
                    <img
                      src={deleteIcon}
                      alt="delete trashcan icon"
                      className="button__delete-icon"
                    />
                  </button>
                  <Link
                    to={`/inventory/edit/${item.id}`}
                    className="inventory-list__button"
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

export default InventoryList;
