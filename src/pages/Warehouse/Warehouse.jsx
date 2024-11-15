<<<<<<< HEAD
import { useState, useEffect } from "react";
import axios from 'axios';
import WarehouseDeleteModal from "../../components/WarehouseDeleteModal/WarehouseDeleteModal";

const baseUrl = "http://localhost:8080";

const Warehouse = ({ warehouses, setWarehouses }) => {
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import WarehouseList from "../../components/WarehouseList/WarehouseList"; // Import WarehouseList component
import WarehouseDeleteModal from "../../components/WarehouseDeleteModal/WarehouseDeleteModal"; // Import the modal component
import "./Warehouse.scss";
import searchIcon from "../../assets/Icons/search-24px.svg";

const WarehousePage = () => {
  const [warehouses, setWarehouses] = useState([]);
>>>>>>> develop
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
  const [selectedWarehouseName, setSelectedWarehouseName] = useState(null);

<<<<<<< HEAD


  useEffect (() => {
=======
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
>>>>>>> develop
    setIsModalOpen(true);
  }, []);

//   const openModal = (warehouseId) => {
//     setSelectedWarehouseId(warehouseId);
//     setSelectedWarehouseName(warehouseName);
//     setIsModalOpen(true);
//   };

  // Close the delete modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWarehouseId(null);
    setSelectedWarehouseName(null);
  };

  // Handle deleting a warehouse
  const handleDelete = async (warehouseId) => {
    try {
<<<<<<< HEAD
      const response = await axios.delete(`${baseUrl}/warehouses/${warehouseId}`);
    
      if(response.status === 200) {

        alert("Warehouse deleted successfully!")
        setWarehouses(warehouses.filter(warehouse => warehouse.id !== warehouseId));
=======
      const response = await axios.delete(
        `${baseUrl}/warehouses/${warehouseId}`
      );
      if (response.status === 204) {
        alert("Warehouse deleted successfully!");
        setWarehouses(
          warehouses.filter((warehouse) => warehouse.id !== warehouseId)
        );
>>>>>>> develop
      } else {
        console.log("Failed to delete warehouse");
      }
    } catch (error) {
      console.log("Error deleting warehouse:", error);
    }
    closeModal(); // Close modal after delete
  };

<<<<<<< HEAD
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
=======
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
        <button type="submit" className="warehouse-page__add-button">
          + Add New Warehouse
        </button>
      </div>

      <WarehouseList
        warehouses={warehouses}
        onDelete={openModal} // Pass the openModal function to handle delete
      />
      {isModalOpen && (
>>>>>>> develop
        <WarehouseDeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={handleDelete}
          warehouseId={selectedWarehouseId}
          warehouseName={selectedWarehouseName}
        />
<<<<<<< HEAD
      )} */}
    </>
=======
      )}
    </div>
>>>>>>> develop
  );
};

export default WarehousePage;
