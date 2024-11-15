import React, { useState, useEffect } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList"; // Import WarehouseList component
import WarehouseDeleteModal from "../../components/WarehouseDeleteModal/WarehouseDeleteModal"; // Import the modal component
import "./Warehouse.scss";
import searchIcon from "../../assets/Icons/search-24px.svg";
import { Link } from 'react-router-dom';

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
    <div className="warehouse-page">
      <div className="warehouse-page__top-box">
        <h1 className="warehouse-page__title">Warehouses</h1>
        <input
          type="text"
          className="warehouse-page__search-input"
          placeholder="Search..."
        ></input>
        {/* <button type="submit" className="warehouse-page__add-button">
          + Add New Warehouse
        </button> */}
        <Link to="/warehouses/add" className="warehouse-page__add-button">
          + Add New Warehouse
        </Link>
      </div>

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
