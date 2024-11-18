import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";
import "./WarehouseDetails.scss";

const WarehouseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="warehouse-details-page">
      <WarehouseDetails
        warehouse={warehouse}
        inventory={inventory}
        onEdit={handleEditClick}
      />
    </div>
  );
};

export default WarehouseDetailsPage;
