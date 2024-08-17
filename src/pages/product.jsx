import React from "react";
import ProductTable from "../components/organism/ProductTable";

const ProductPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ProductTable />
    </div>
  );
};

export default ProductPage;
