import React from "react";
import TopSellingCard from "../../molecules/TopSellingCard";
import ReportsCard from "../../molecules/ReportsCard";

const BottomSection = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
    <ReportsCard />
    <TopSellingCard />
  </div>
);

export default BottomSection;
