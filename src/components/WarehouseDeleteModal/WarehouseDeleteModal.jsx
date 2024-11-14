import React from "react";
import "./WarehouseDeleteModal.scss"; // Import styles for the modal

const WarehouseDeleteModal = ({ isOpen, onClose, onDelete, warehouseId }) => {
  // Don't render the modal if it's not open
  if (!isOpen) return null;

  const handleDeleteClick = () => {
    if (warehouseId) {
      onDelete(warehouseId); // Perform the deletion if warehouseId is available
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure you want to delete this warehouse?</h2>
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

export default WarehouseDeleteModal;
