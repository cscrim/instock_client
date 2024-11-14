import './WarehouseDeleteModal.scss';

const deleteModal = ( { isOpen, onClose, onDelete, warehouseId }) => {
    if(!isOpen) return null;

    const handleDeleteClick = () => {
        if(warehouseId) {
            onDelete(warehouseId)
        }
    };

    return (
        <>
        </>
    );
 };


 export default WarehouseDeleteModal;