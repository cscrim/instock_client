import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./InventoryList.scss"; // Updated styling
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import chevronIcon from "../../assets/Icons/chevron_right-24px.svg";
import sortIcon from "../../assets/Icons/sort-24px.svg";

const InventoryList = ({ inventoryItems, onDelete, hideWarehouseColumn }) => {
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
    <div className="inventory-list">
      {/* Header row for tablet and desktop views */}
      <div className="inventory-list__header-row">
        <div className="header-row__title-box">
          <div className="inventory-list__header-item">INVENTORY ITEM</div>
          <img src={sortIcon} alt="sort icon" className="sort-icon" />
        </div>
        <div className="header-row__title-box">
          <div className="inventory-list__header-item">CATEGORY</div>
          <img src={sortIcon} alt="sort icon" className="sort-icon" />
        </div>
        <div className="header-row__title-box">
          <div className="inventory-list__header-item">STATUS</div>
          <img src={sortIcon} alt="sort icon" className="sort-icon" />
        </div>
        <div className="header-row__title-box">
          <div className="inventory-list__header-item">QTY</div>
          <img src={sortIcon} alt="sort icon" className="sort-icon" />
        </div>
        {!hideWarehouseColumn && (
          <div className="header-row__title-box">
            <div className="inventory-list__header-item">WAREHOUSE</div>
            <img src={sortIcon} alt="sort icon" className="sort-icon" />
          </div>
        )}
        <div className="inventory-list__header-item">ACTIONS</div>
      </div>

      {/* Rows for inventory items */}
      {inventoryItems.map((item) => (
        <div key={item.id} className="inventory-list__row">
          {/* Conditional layout for mobile or larger screens */}
          {isMobile ? (
            <div className="inventory-list__content-box">
              <div className="list-column">
                <div className="inventory-list__item">
                  <div className="inventory-list__header-item">
                    INVENTORY ITEM
                  </div>
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
                  <div className="inventory-list__header-item">STATUS</div>
                  <div
                    className={
                      item.status === "Out of Stock"
                        ? "item__outstock"
                        : "item__instock"
                    }
                  >
                    {item.status}
                  </div>
                </div>
                <div className="inventory-list__item">
                  <div className="inventory-list__header-item inventory-list__header-item--qty">
                    QTY
                  </div>
                  <div>{item.quantity}</div>
                </div>
                {!hideWarehouseColumn && (
                  <div className="inventory-list__item">
                    <div className="inventory-list__header-item">WAREHOUSE</div>
                    <div>{item.warehouse_name}</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* <div className="list-column"> */}
              <div className="inventory-list__item">
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
              <div className="inventory-list__item inventory-list__item--padding">
                {item.category}
              </div>
              {/* </div> */}
              {/* <div className="list-column"> */}
              <div
                className="inventory-list__item inventory-list__item--padding
              "
              >
                <div
                  className={
                    item.status === "Out of Stock"
                      ? "item__outstock"
                      : "item__instock"
                  }
                >
                  {item.status}
                </div>
              </div>
              <div className="inventory-list__item inventory-list__item--padding">
                {item.quantity}
              </div>
              {!hideWarehouseColumn && (
                <div className="inventory-list__item inventory-list__item--padding">
                  {item.warehouse_name}
                </div>
              )}
            </>
          )}
          <div className="inventory-list__item inventory-list__item--actions">
            <button
              className="inventory-list__button"
              onClick={() => onDelete(item.id, item.item_name)}
            >
              <img src={deleteIcon} alt="delete trashcan icon" />
            </button>
            <Link
              to={`/inventory/edit/${item.id}`}
              className="inventory-list__button"
            >
              <img src={editIcon} alt="edit pencil icon" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryList;
