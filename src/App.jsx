// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
// Import your pages here
import Warehouse from "./pages/Warehouse/Warehouse";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails";
import EditWarehouse from "./pages/EditWarehouse/EditWarehouse";
import AddWarehouse from "./pages/AddWarehouse/AddWarehouse";

// Import InventoryDetails component
import InventoryDetails from "./pages/InventoryDetails/InventoryDetails";
// Import other inventory-related components if necessary
// import EditInventory from './pages/EditInventory/EditInventory';
// import AddInventory from './pages/AddInventory/AddInventory';

import "./App.scss";

function App() {
  // Mock of a selected inventory item for demonstration purposes.
  const [selectedInventoryItem, setSelectedInventoryItem] = useState({
    id: 1,
    item_name: "Sample Item",
    quantity: 100,
    warehouse_name: "Warehouse A",
    description: "This is a sample inventory item.",
    unit_price: 25.5,
  });

  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Routes>
            {/* Warehouse Routes */}
            <Route path="/" element={<Warehouse />} />
            <Route
              path="/warehouses/edit/:warehouseId"
              element={<EditWarehouse />}
            />
            <Route path="/warehouses/details" element={<WarehouseDetails />} />
            <Route path="/warehouses/add" element={<AddWarehouse />} />

            {/* Inventory Routes */}
            <Route
              path="/inventory/details/:id"
              element={<InventoryDetails />}
              inventory={selectedInventoryItem}
            />
          </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
