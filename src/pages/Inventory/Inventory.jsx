// src/pages/InventoryPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import InventoryList from "../../components/InventoryList/InventoryList"; // Import InventoryList component
import InventoryDeleteModal from "../../components/InventoryDeleteModal/InventoryDeleteModal"; // Import the modal component
import "./Inventory.scss";

const InventoryPage = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);

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
  const openModal = (inventoryId) => {
    setSelectedInventoryId(inventoryId);
    setIsModalOpen(true);
  };

  // Close the delete modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInventoryId(null);
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
        <button type="submit" className="inventory-page__add-button">
          + Add New Inventory Item
        </button>
      </div>

      <InventoryList
        inventoryItems={inventoryItems}
        onDelete={openModal} // Pass the openModal function to handle delete
      />
      {isModalOpen && (
        <InventoryDeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={handleDelete}
          inventoryId={selectedInventoryId}
        />
      )}
    </div>
  );
};

export default InventoryPage;
