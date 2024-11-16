import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
import "./WarehouseDetails.scss";

const WarehouseDetailsPage = () => {
  const { id } = useParams(); // Get warehouse id from URL
  const navigate = useNavigate(); // For navigation
  const [warehouse, setWarehouse] = useState(null); // State for warehouse details
  const [inventory, setInventory] = useState([]); // State for inventory data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const baseUrl = "http://localhost:8080";

  // Fetch warehouse details and inventory when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        // Fetch warehouse details
        const warehouseResponse = await axios.get(
          `${baseUrl}/warehouses/${id}`
        );
        setWarehouse(warehouseResponse.data);

        // Fetch inventory for the warehouse
        const inventoryResponse = await axios.get(
          `${baseUrl}/warehouses/${id}/inventory`
        );
        setInventory(inventoryResponse.data);
      } catch (err) {
        // Handle errors
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [id]);

  const handleEditClick = () => {
    // Navigate to the edit page
    navigate(`/edit-warehouse/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div className="warehouse-details-page">
      <WarehouseDetails
        warehouse={warehouse}
        inventory={inventory} // Pass inventory data as a prop
        onEdit={handleEditClick}
      />
    </div>
  );
};

export default WarehouseDetailsPage;
