import "./InventoryDeleteModal.scss";
import cancelIcon from '../../assets/Icons/close-24px.svg';

const InventoryDeleteModal = ({
  isOpen,
  onClose,
  onDelete,
  inventoryId,
  categoryName,
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

      <button className="cancel-button">
            <img src={cancelIcon} onClick={handleCancelClick} alt="Cancel" />
          </button>


        <div className="modalContent">
          <h1>Delete {categoryName} inventory item?</h1>
          <h2>
            Please confirm you'd like to delete {categoryName} from the inventory. You won't be able to undo this action.
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
