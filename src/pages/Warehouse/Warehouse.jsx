import { useState } from "react";
import WarehouseDeleteModal from "../../components/WarehouseDeleteModal";

const baseUrl = "http://localhost:8080";

const warehousePage = ({ warehouses, setWarehouses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);

  const openModal = (warehouseId) => {
    setSelectedWarehouseId(warehouseId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWarehouseId(null);
  };

  const handleDelete = async (warehouseId) => {
    try {
      const response = await fetch(`${baseUrl}/warehouses/${warehouseId}`, {
        method: "DELETE",
      });

      if(response.ok) {

        alert("Warehouse deleted successfully!")
        setWarehouses(warehouses.filter(warehouse => warehouse.id !== warehouseId));
      } else {
        console.log("failed to delete warehouse");
      }

    } catch (error) {
      console.log("error deleting warehouse:", error);
    }

    closeModal();
  };

  return (
    <>
      {/* add onClick handler inside the .map function for each warehouse in the list so we can target each one with the modal
      <button onClick={() => openModal(warehouse.id)}>🗑️</button> */}

      {isModalOpen && (
        <WarehouseDeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={handleDelete}
          warehouseId={selectedWarehouseId}
        />
      )}
    </>
  );
};

export default Warehouse;