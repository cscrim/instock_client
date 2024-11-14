import { useState, useEffect } from "react";
import axios from 'axios';
import WarehouseDeleteModal from "../../components/WarehouseDeleteModal/WarehouseDeleteModal";

const baseUrl = "http://localhost:8080";

const Warehouse = ({ warehouses, setWarehouses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const [selectedWarehouseName, setSelectedWarehouseName] = useState(null);



  useEffect (() => {
    setIsModalOpen(true);
  }, []);

//   const openModal = (warehouseId) => {
//     setSelectedWarehouseId(warehouseId);
//     setSelectedWarehouseName(warehouseName);
//     setIsModalOpen(true);
//   };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWarehouseId(null);
    setSelectedWarehouseName(null);
  };

  const handleDelete = async (warehouseId) => {
    try {
      const response = await axios.delete(`${baseUrl}/warehouses/${warehouseId}`);
    
      if(response.status === 200) {

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
      <div>
      {/* The modal should open automatically when the component mounts */}
      <WarehouseDeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
        warehouseId={selectedWarehouseId}
        warehouseName={selectedWarehouseName}
      />
    </div>







      {/* add onClick handler inside the .map function for each warehouse in the list so we can target each one with the modal
      <button onClick={() => openModal(warehouse.id)}>🗑️</button> */}

      {/* {isModalOpen && (
        <WarehouseDeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={handleDelete}
          warehouseId={selectedWarehouseId}
          warehouseName={selectedWarehouseName}
        />
      )} */}
    </>
  );
};

export default Warehouse;