import "./InventoryDeleteModal.scss";

const InventoryDeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  inventoryId,
  inventoryName,
}) => {
  if (!isOpen) return null;

  const handleDeleteClick = () => {
    if (inventoryId) {
      onDelete(inventoryId);
    }
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <div className="modalWrapper">
      <div className="modalOverlay">
        <div className="modalContent">
          <h1>Delete {inventoryName} inventory item?</h1>
          <h2>
            Please confirm you'd like to delete the {inventoryName} item
            from the inventory. You won't be able to undo this action.
          </h2>
        </div>

        <div className="modalButtons">
          <button className="cancel" onClick={handleCancelClick}>
            Cancel
          </button>
          <button className="delete" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryDeleteModal;
