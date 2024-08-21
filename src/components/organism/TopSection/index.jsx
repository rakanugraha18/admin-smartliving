import React from "react";
import SalesCard from "../../molecules/SalesCard";
import RevenueCard from "../../molecules/RevenueCard";
import CustomerCard from "../../molecules/CustomerCard";

const TopSection = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <SalesCard />
    <RevenueCard />
    <CustomerCard />
  </div>
);

export default TopSection;
