import React from "react";
import OrderTable from "../components/organism/OrderTable"; // Sesuaikan dengan path file komponen

const OrderPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
      <OrderTable />
    </div>
  );
};

export default OrderPage;
