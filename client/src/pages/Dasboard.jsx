import React, { useState } from "react";
import OrdersPage from "./Dashboard/OrdersPage";
import ProductsPage from "./Dashboard/ProductsPage";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "orders":
        return <OrdersPage />;
      default:
        return <ProductsPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActivePage("products")}
            className="block text-left w-full text-gray-700 hover:text-blue-500"
          >
            Products
          </button>
          <button
            onClick={() => setActivePage("orders")}
            className="block text-left w-full text-gray-700 hover:text-blue-500"
          >
            Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Topbar */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold capitalize">{activePage}</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </header>

        {/* Page Content */}
        {renderPage()}
      </div>
    </div>
  );
}
