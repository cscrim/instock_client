import "./WarehouseDeleteModal.scss";
import cancelIcon from '../../assets/Icons/close-24px.svg';

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
    <div className="modalWrapper">
      <div className="modalOverlay">
      
          <button className="cancel-button">
            <img src={cancelIcon} onClick={handleCancelClick} alt="Cancel" />
          </button>
       
        <div className="modalContent">
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
    </div>
  );
};

export default WarehouseDeleteModal;
