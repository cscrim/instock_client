import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Warehouse from "./pages/Warehouse/Warehouse";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails";
import EditWarehouse from "./pages/EditWarehouse/EditWarehouse";
import AddWarehouse from "./pages/AddWarehouse/AddWarehouse";
import Inventory from "./pages/Inventory/Inventory";
import InventoryDetails from "./pages/InventoryDetails/InventoryDetails";

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
            <Route path="/warehouses/edit/:id" element={<EditWarehouse />} />
            <Route
              path="/warehouses/details/:id"
              element={<WarehouseDetails />}
            />
            <Route path="/warehouses/add" element={<AddWarehouse />} />
            {/* Inventory Routes */}
            <Route path="/inventory" element={<Inventory />} />
            <Route
              path="/inventory/details/:inventoryId"
              element={<InventoryDetails />}
            />

            {/* <Route path="/inventory/:id" element={<InventoryDetails />} />{" "} */}
            {/* Match inventory/:id */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
