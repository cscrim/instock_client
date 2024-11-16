// src/pages/InventoryPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InventoryList from "../../components/InventoryList/InventoryList"; // Import InventoryList component
import InventoryDeleteModal from "../../components/InventoryDeleteModal/InventoryDeleteModal"; // Import the modal component
import "./Inventory.scss";

const InventoryPage = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  const baseUrl = "http://localhost:8080";

  // Fetch inventory items from the backend
  const fetchInventoryItems = async () => {
    try {
      const response = await axios.get(`${baseUrl}/inventory`);
      setInventoryItems(response.data);
    } catch (error) {
      console.error("Error fetching inventory items:", error);
    }
  };

  // Open the delete modal
  const openModal = (inventoryId, categoryName) => {
    setSelectedInventoryId(inventoryId);
    setSelectedCategoryName(categoryName);
    setIsModalOpen(true);
  };

  // Close the delete modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInventoryId(null);
    setSelectedCategoryName(null);
  };

  // Handle deleting an inventory item
  const handleDelete = async (inventoryId) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/inventory/${inventoryId}`
      );
      if (response.status === 204) {
        alert("Inventory item deleted successfully!");
        setInventoryItems(
          inventoryItems.filter((item) => item.id !== inventoryId)
        );
      } else {
        console.log("Failed to delete inventory item");
      }
    } catch (error) {
      console.log("Error deleting inventory item:", error);
    }
    closeModal(); // Close modal after delete
  };

  // Fetch inventory items when the page loads
  useEffect(() => {
    fetchInventoryItems();
  }, []);

  return (
    <div className="inventory-page">
      <div className="inventory-page__top-box">
        <h1 className="inventory-page__title">Inventory</h1>
        <input
          type="text"
          className="inventory-page__search-input"
          placeholder="Search..."
        ></input>
        {/* <button type="submit" className="inventory-page__add-button">
          + Add New Item
        </button> */}
        <Link to="/inventory/add" className="inventory-page__add-button">
          + Add New Item
        </Link>
      </div>

      {/* <InventoryList
        inventoryItems={inventoryItems}
        onDelete={openModal} // Pass the openModal function to handle delete
      /> */}

      <InventoryList
        inventoryItems={inventoryItems}
        onDelete={(inventoryId, categoryName) =>
          openModal(inventoryId, categoryName)
        } 
      />
      {isModalOpen && (
        <InventoryDeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={handleDelete}
          inventoryId={selectedInventoryId}
          categoryName={selectedCategoryName}
        />
      )}
    </div>
  );
};

export default InventoryPage;
