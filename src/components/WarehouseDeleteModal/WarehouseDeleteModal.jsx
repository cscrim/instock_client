import "./WarehouseDeleteModal.scss";
// import Modal from "react-modal";

// Modal.setAppElement("#root");

const WarehouseDeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  warehouseId,
  warehouseName,
}) => {
  if (!isOpen) return null;

  const handleDeleteClick = () => {
    if (warehouseId) {
      onDelete(warehouseId);
    }
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    // <Modal
    //   isOpen={isOpen}
    //   onRequestClose={onClose}
    //   className="modalContent"
    //   overlayClassName="modalOverlay"
    //   contentLabel="Delete Warehouse"
    // >
    <div className="modal__container">
        <div className="modal__content">
          <h1>Delete {warehouseName} warehouse?</h1>
          <h2>
            Please confirm you'd like to delete the {warehouseName} warehouse
            from the list of warehouses. You won't be able to undo this action.
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
        
   
  );
};

export default WarehouseDeleteModal;


