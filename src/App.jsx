import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'

import Warehouse from './pages/Warehouse/Warehouse';
import WarehouseDetails from './pages/WarehouseDetails/WarehouseDetails';
import EditWarehouse from './pages/EditWarehouse/EditWarehouse';
import AddWarehouse from './pages/AddWarehouse/AddWarehouse';

import Inventory from './pages/Inventory/Inventory';
import InventoryDetails from './pages/InventoryDetails/InventoryDetails';
import EditInventory from './pages/EditInventory/EditInventory';
import AddInventory from './pages/AddInventory/AddInventory';


import './App.scss'

function App() {
  
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>

          {/* Warehouse Routes */}
          <Route path="/warehouses" element={<Warehouse />} />
          <Route path="/warehouses/details" element={<WarehouseDetails />} /> 
          <Route path="/warehouses/edit/:id" element={<EditWarehouse />} />
          <Route path="/warehouses/add" element={<AddWarehouse />} />


          {/* Inventory Routes */}
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/details" element={<InventoryDetails />} />
          <Route path="/inventory/edit/:id" element={<EditInventory />} />
          <Route path="/inventory/add" element={<AddInventory />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

