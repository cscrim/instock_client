import React, { useState, useEffect } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList"; // Import WarehouseList component
import WarehouseDeleteModal from "../../components/WarehouseDeleteModal/WarehouseDeleteModal"; // Import the modal component

const WarehousePage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);

  const baseUrl = "http://localhost:8080";

  // Fetch warehouses from the backend
  const fetchWarehouses = async () => {
    try {
      const response = await axios.get(`${baseUrl}/warehouses`);
      setWarehouses(response.data);
    } catch (error) {
      console.error("Error fetching warehouses:", error);
    }
  };

  // Open the delete modal
  const openModal = (warehouseId) => {
    setSelectedWarehouseId(warehouseId);
    setIsModalOpen(true);
  };

  // Close the delete modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWarehouseId(null);
  };

  // Handle deleting a warehouse
  const handleDelete = async (warehouseId) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/warehouses/${warehouseId}`
      );
      if (response.status === 204) {
        alert("Warehouse deleted successfully!");
        setWarehouses(
          warehouses.filter((warehouse) => warehouse.id !== warehouseId)
        );
      } else {
        console.log("Failed to delete warehouse");
      }
    } catch (error) {
      console.log("Error deleting warehouse:", error);
    }
    closeModal(); // Close modal after delete
  };

  // Fetch warehouses when the page loads
  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <div className="WarehousePage">
      <h1>Warehouses</h1>
      <input type="text" placeholder="Search..."></input>
      <button type="submit">+ Add New Warehouse</button>

      <WarehouseList
        warehouses={warehouses}
        onDelete={openModal} // Pass the openModal function to handle delete
      />
      {isModalOpen && (
        <WarehouseDeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={handleDelete}
          warehouseId={selectedWarehouseId}
        />
      )}
    </div>
  );
};

export default WarehousePage;
