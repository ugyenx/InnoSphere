import axios from "axios";
import React, { useEffect, useState } from "react";

export default function IndividualOrder() {
  const [orders, setOrder] = useState([]);
  async function fetchOrders() {
    try {
      let res = await axios.get("http://localhost:3000/viewIndividualOrders", {
        withCredentials: true,
      });
      setOrder(res.data.orders);
    } catch (error) {
      alert("please signin");
    }
  }
  useEffect(() => {
    fetchOrders();
    return () => {};
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Your Orders
      </h1>

      <div className="flex flex-col items-center gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-xl p-6 w-full max-w-xl"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Order ID: {order.order_id}
            </h2>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">Placed On:</span>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>

            <p className="text-gray-600 mb-1">
              <span className="font-medium">User ID:</span>{" "}
              {order.user?._id || "N/A"}
            </p>

            <div className="mt-4">
              <p className="font-medium text-gray-700 mb-1">Items:</p>
              <ul className="list-disc list-inside text-gray-600">
                {order.items?.length > 0 ? (
                  order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} {/* adjust based on item model */}
                    </li>
                  ))
                ) : (
                  <li>No items found</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
