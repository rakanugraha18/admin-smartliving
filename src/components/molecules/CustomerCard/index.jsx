import React, { useEffect, useState } from "react";
import Card from "../../atoms/Card";
import axios from "axios";

const CustomerCard = () => {
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalCustomers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASEURL}/api/admin/all-customers`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const customers = response.data; // Mendapatkan data pelanggan dari respons
        setTotal(customers.length); // Menghitung total pelanggan
      } catch (err) {
        console.error("Error fetching total customers:", err);
        setError("Error fetching customer data.");
      }
    };

    fetchTotalCustomers();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Card title="Customer">
      <p className="text-lg">Total Customers: {total}</p>
    </Card>
  );
};

export default CustomerCard;
