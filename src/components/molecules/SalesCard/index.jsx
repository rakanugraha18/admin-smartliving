import React, { useState, useEffect } from "react";
import Dropdown from "../../atoms/Dropdown";
import Card from "../../atoms/Card";
import axios from "axios";

const SalesCard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Day");
  const [salesData, setSalesData] = useState(0);

  const options = ["Day", "Week", "Month", "Year"];

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASEURL}/api/order`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Ganti dengan token Anda
            },
          }
        );

        const orders = response.data.orders;

        // Filter orders yang statusnya 'completed'
        const completedOrders = orders.filter(
          (order) => order.status === "completed"
        );

        // Tentukan periode waktu saat ini
        const now = new Date();

        // Filter berdasarkan periode waktu yang dipilih
        const filteredOrders = completedOrders.filter((order) => {
          const orderDate = new Date(order.created_at);

          switch (selectedPeriod) {
            case "Day":
              return orderDate.toDateString() === now.toDateString();
            case "Week":
              const startOfWeek = new Date(now);
              startOfWeek.setDate(now.getDate() - now.getDay()); // Set to the start of the week (Sunday)
              startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

              const endOfWeek = new Date(now);
              endOfWeek.setDate(now.getDate() + (6 - now.getDay())); // Set to the end of the week (Saturday)
              endOfWeek.setHours(23, 59, 59, 999); // Set time to the end of the day

              return orderDate >= startOfWeek && orderDate <= endOfWeek;

            case "Month":
              return (
                orderDate.getMonth() === now.getMonth() &&
                orderDate.getFullYear() === now.getFullYear()
              );
            case "Year":
              return orderDate.getFullYear() === now.getFullYear();
            default:
              return false;
          }
        });

        // Jumlahkan total_amount dari orders yang difilter
        const totalSales = filteredOrders.reduce((total, order) => {
          return total + parseFloat(order.total_amount);
        }, 0);

        setSalesData(totalSales);
      } catch (error) {
        console.error("Error fetching sales data", error);
      }
    };

    fetchSalesData();
  }, [selectedPeriod]);

  return (
    <Card title="Sales">
      <div className="flex justify-between items-center">
        <Dropdown
          options={options}
          selected={selectedPeriod}
          onChange={setSelectedPeriod}
        />
      </div>
      <p className="text-2xl font-bold mt-4">Rp {salesData.toLocaleString()}</p>
    </Card>
  );
};

export default SalesCard;
