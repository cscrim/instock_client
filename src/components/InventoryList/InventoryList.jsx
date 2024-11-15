// // src/components/InventoryList.jsx
// import React from "react";
// import "./InventoryList.scss";
// import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
// import editIcon from "../../assets/Icons/edit-24px.svg";

// const InventoryList = ({ inventoryItems, onDelete }) => {
//   return (
//     <div className="inventory-list">
//       <div className="inventory-list__header-row">
//         <div className="inventory-list__header-item">INVENTORY ITEM</div>
//         <div className="inventory-list__header-item">CATEGORY</div>
//         <div className="inventory-list__header-item">STATUS</div>
//         <div className="inventory-list__header-item">QTY</div>
//         <div className="inventory-list__header-item">WAREHOUSE</div>
//         <div className="inventory-list__header-item">ACTIONS</div>
//       </div>

//       {inventoryItems.map((item) => (
//         <div key={item.id} className="inventory-list__row">
//           <div className="inventory-list__item">{item.item_name}</div>
//           <div className="inventory-list__item">{item.category}</div>
//           <div className="inventory-list__item">{item.status}</div>
//           <div className="inventory-list__item">{item.quantity}</div>
//           <div className="inventory-list__item">{item.warehouse_name}</div>
//           <div className="inventory-list__item inventory-list__item--right">
//             <button
//               className="inventory-list__button"
//               onClick={() => onDelete(item.id)}
//             >
//               <img src={deleteIcon} alt="delete icon" />
//             </button>
//             <button className="inventory-list__button">
//               <img src={editIcon} alt="edit icon" />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default InventoryList;

import React from "react";
import { Link } from "react-router-dom";
import "./InventoryList.scss"; // Make sure this file exists and is updated for inventory
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";

const InventoryList = ({ inventoryItems, onDelete }) => {
  return (
    <div className="inventory-list">
      {/* Header row for tablet and desktop view */}
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
          <div className="inventory-list__item">
            <div className="inventory-list__header-item mobile-only">
              INVENTORY ITEM
            </div>
            {/* Link to InventoryDetails */}
            <Link
              to={`/inventory/details/${item.id}`}
              className="inventory-list__name-link"
            >
              {item.item_name}
            </Link>
          </div>
          <div className="inventory-list__item">
            <div className="inventory-list__header-item mobile-only">
              CATEGORY
            </div>
            <div>{item.category}</div>
          </div>
          <div className="inventory-list__item">
            <div className="inventory-list__header-item mobile-only">
              STATUS
            </div>
            <div>{item.status}</div>
          </div>
          <div className="inventory-list__item">
            <div className="inventory-list__header-item mobile-only">QTY</div>
            <div>{item.quantity}</div>
          </div>
          <div className="inventory-list__item">
            <div className="inventory-list__header-item mobile-only">
              WAREHOUSE
            </div>
            <div>{item.warehouse_name}</div>
          </div>

          <div className="inventory-list__item inventory-list__item--right">
            <div className="inventory-list__header-item inventory-list__header-item--mobile">
              ACTIONS
            </div>
            <button
              className="inventory-list__button"
              onClick={() => onDelete(item.id, item.item_name)}
            >
              <img src={deleteIcon} alt="delete trashcan icon" />
            </button>
            {/* Link for editing inventory item */}
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
