// src/components/InventoryDeleteModal.jsx
import React from "react";
// import "./InventoryDeleteModal.scss"; // Import styles for the modal

const InventoryDeleteModal = ({ isOpen, onClose, onDelete, inventoryId }) => {
  // Don't render the modal if it's not open
  if (!isOpen) return null;

  const handleDeleteClick = () => {
    if (inventoryId) {
      onDelete(inventoryId); // Perform the deletion if inventoryId is available
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure you want to delete this inventory item?</h2>
        <div className="modal-actions">
          <button onClick={onClose} className="modal-cancel-button">
            Cancel
          </button>
          <button onClick={handleDeleteClick} className="modal-delete-button">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryDeleteModal;
