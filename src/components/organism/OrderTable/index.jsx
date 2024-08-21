import React, { useEffect, useState } from "react";
import axios from "axios";
import formatRupiah from "../../../utils/formatRupiah";
import { Link } from "react-router-dom";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders for admin
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/order", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOrders(response.data.orders);

        console.log(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2 border-r">Order ID</th>
            <th className="text-left px-4 py-2 border-r">User</th>
            <th className="text-left px-4 py-2 border-r">Status</th>
            <th className="text-left px-4 py-2 border-r">Total Amount</th>
            <th className="text-left px-4 py-2 border-r">Payment Method</th>
            <th className="text-left px-4 py-2 border-r">Order Items</th>
            <th className="text-left px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="px-4 py-2 border-r">#18082024{order.id}</td>
              <td className="px-4 py-2 border-r">
                {order.user_order.first_name} {order.user_order.last_name}
              </td>
              <td className="px-4 py-2 border-r">{order.status}</td>
              <td className="px-4 py-2 border-r">
                {formatRupiah(order.total_amount)}
              </td>
              <td className="px-4 py-2 border-r">
                {order.paymentMethod?.type} -{" "}
                {order.paymentMethod?.selectedbank}
              </td>
              <td className="px-4 py-2 border-r">
                {order.order_Items.map((item) => (
                  <div key={item.id}>{item.quantity} Items</div>
                ))}
              </td>
              <td className="px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  <Link
                    to={`/orders/${order.user_order.id}/${order.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Action
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
