import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import formatRupiah from "../utils/formatRupiah";

const OrderDetailPage = () => {
  const { user_id, order_id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/order/${user_id}/${order_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrder(response.data.order);
        setStatus(response.data.order.status);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrder();
  }, [user_id, order_id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/order/${order_id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="bg-white p-4 shadow rounded">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
          <p>
            <strong>User:</strong> {order.user_order.first_name}
            {""} {order.user_order.lash_name}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <p>
            <strong>Total Amount:</strong> {formatRupiah(order.total_amount)}
          </p>
          <p>
            <strong>Address:</strong> {order.address?.address_name}{" "}
            {order.address?.villages} {order.address?.subdistrict}{" "}
            {order.address?.city} {order.address?.province}{" "}
            {order.address?.postal_code}
          </p>
          <p>
            <strong>Payment Method:</strong> {order.paymentMethod?.type} -{" "}
            {order.paymentMethod?.selectedBank}
          </p>
          <div>
            <strong>Order Items:</strong>
            <ul>
              {order.order_Items.map((item) => (
                <li key={item.id}>
                  {item.productOrder.name} (Qty: {item.quantity})
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleStatusChange("completed")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
          >
            Mark as Completed
          </button>
          <button
            onClick={() => handleStatusChange("shipped")}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
          >
            Mark as Shipped
          </button>
          <button
            onClick={() => handleStatusChange("cancelled")}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
