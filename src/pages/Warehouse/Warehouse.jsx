import React, { useState, useEffect } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList"; // Import WarehouseList component
import WarehouseDeleteModal from "../../components/WarehouseDeleteModal/WarehouseDeleteModal"; // Import the modal component
import "./Warehouse.scss";
import { Link } from "react-router-dom";

const WarehousePage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const [selectedWarehouseName, setSelectedWarehouseName] = useState(null);

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
  const openModal = (warehouseId, warehouseName) => {
    if (selectedWarehouseId) return;

    setSelectedWarehouseId(warehouseId);
    setSelectedWarehouseName(warehouseName);
  };

  // Close the delete modal
  const closeModal = () => {
    setSelectedWarehouseId(null);
    setSelectedWarehouseName(null);
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

  useEffect(() => {
    if (selectedWarehouseId && selectedWarehouseName) {
      console.log("modal should open for now:", selectedWarehouseName);
    }
  }, [selectedWarehouseId, selectedWarehouseName]);

  return (
    <div className="warehouse-page">
      <div className="warehouse-page__top-box">
        <h1 className="warehouse-page__title">Warehouses</h1>
        <input
          type="text"
          className="warehouse-page__search-input"
          placeholder="Search..."
        ></input>

        <Link to="/warehouses/add" className="warehouse-page__add-button">
          + Add New Warehouse
        </Link>
      </div>
      <WarehouseList
        warehouses={warehouses}
        onDelete={(warehouseId, warehouseName) =>
          openModal(warehouseId, warehouseName)
        } // Pass the openModal function to handle delete
      />

      {selectedWarehouseId && selectedWarehouseName
        ? (console.log("Rendering modal..."),
          (
            <WarehouseDeleteModal
              key={selectedWarehouseId}
              isOpen={true}
              onClose={closeModal}
              onDelete={handleDelete}
              warehouseId={selectedWarehouseId}
              warehouseName={selectedWarehouseName}
            />
          ))
        : null}
    </div>
  );
};

export default WarehousePage;
