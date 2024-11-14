// src/pages/WarehouseDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams for URL params, useNavigate for navigation
import axios from "axios"; // Import axios
import WarehouseDetails from "../../components/WarehouseDetails/WarehouseDetails";

const WarehouseDetailsPage = () => {
  const { id } = useParams(); // Get warehouse id from URL
  const navigate = useNavigate(); // For navigating programmatically
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(true); // To show loading state
  const [error, setError] = useState(null); // To handle errors

  const baseUrl = "http://localhost:8080";

  // Fetch warehouse details when the page loads
  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      try {
        // Make the API call using axios
        const response = await axios.get(`${baseUrl}/warehouses/${id}`);

        // Set the warehouse data from the response
        setWarehouse(response.data);
      } catch (err) {
        // Handle any errors from the API call
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        // Set loading to false after the data is fetched
        setLoading(false);
      }
    };

    fetchWarehouseDetails();
  }, [id]);

  const handleEditClick = () => {
    // Navigate to the edit page
    navigate(`/edit-warehouse/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  return (
    <div className="warehouse-details-page">
      <WarehouseDetails warehouse={warehouse} onEdit={handleEditClick} />
    </div>
  );
};

export default WarehouseDetailsPage;
