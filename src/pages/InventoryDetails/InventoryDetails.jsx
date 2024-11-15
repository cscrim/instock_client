import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

const InventoryDetails = () => {
  const { inventoryId } = useParams(); // Get inventoryId from the route params
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`${BASE_URL}/inventory/${inventoryId}`);
        if (!response.ok) throw new Error("Could not fetch inventory item");
        const data = await response.json();
        setInventory(data); // Set the fetched inventory data
      } catch (err) {
        setError(err.message); // Set the error if any occurs
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchInventory();
  }, [inventoryId]); // Fetch data when inventoryId changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!inventory) {
    return <p>No inventory found</p>;
  }

  return (
    <div>
      <h1>{inventory.item_name}</h1>
      <p>Quantity: {inventory.quantity}</p>
      <p>Location: {inventory.warehouse_name}</p>
      <p>Description: {inventory.description}</p>
      <p>Price: ${inventory.unit_price}</p>
      <p>
        Total Value: ${(inventory.quantity * inventory.unit_price).toFixed(2)}
      </p>
    </div>
  );
};

export default InventoryDetails;
