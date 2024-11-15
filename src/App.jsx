// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";

// Import pages
import Warehouse from "./pages/Warehouse/Warehouse";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails";
import EditWarehouse from "./pages/EditWarehouse/EditWarehouse";
import AddWarehouse from "./pages/AddWarehouse/AddWarehouse";

// Import Inventory details and edit pages

import InventoryDetails from "./pages/InventoryDetails/InventoryDetails";
// (If you have them, you can uncomment these routes for other inventory-related components)
import EditInventory from './pages/EditInventory/EditInventory';
// import AddInventory from './pages/AddInventory/AddInventory';

import "./App.scss";

function App() {
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

            <Route
              path="/inventory/details/:inventoryId"
              element={<InventoryDetails />}
            />
            <Route path="/inventory/edit/:id" element={<EditInventory />} />

            {/* <Route path="/inventory/details" element={<InventoryDetails />} /> */}
            {/* <Route path="/inventory/add" element={<AddInventory />} />  */}
          </Routes>
        </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
