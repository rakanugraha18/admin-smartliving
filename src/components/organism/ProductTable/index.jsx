import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import formatRupiah from "../../../utils/formatRupiah";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "../../atoms/SearchBox";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (productId) => {
    console.log("Edit product", productId);
    navigate(`/edit-product/${productId}`);
    // Remove images from local storage only after a successful update
    const imageKeys = Object.keys(localStorage).filter((key) =>
      key.startsWith("imageUrl_")
    );
    imageKeys.forEach((key) => localStorage.removeItem(key));
    localStorage.removeItem("displayUrl");
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Kirim token untuk otentikasi
        },
      });
      console.log("Product deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product. Please try again.");
    }
  };

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on entries change
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  const totalEntries = products.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full border border-spacing-2 p-3 bg-white border-[#16697A]">
        <div className="flex justify-between px-1 pb-2 items-center">
          <div className="flex items-center">
            <p className="mr-2">Show</p>
            <select
              value={entriesPerPage}
              onChange={handleEntriesChange}
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
            <p className="ml-2">entries</p>
          </div>
          <div className="flex justify-between items-center">
            <Link to="/add-product">
              <p className="px-3 text-[#16697A]">+ Add Product</p>
            </Link>
            <SearchBox />
          </div>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="text-left">
            <tr>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Color</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Discount</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b">{product.color}</td>
                <td className="py-2 px-4 border-b">
                  {formatRupiah(product.price)}
                </td>
                <td className="py-2 px-4 border-b">{product.discount}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center pt-4">
          <p>
            Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of{" "}
            {totalEntries}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md enabled:hover:text-[#16697A] enabled:hover:border-[#16697A] "
            >
              Previous
            </button>
            <div className="px-4 py-2 bg-[#16697A] text-white">
              {currentPage}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-md enabled:hover:text-[#16697A] enabled:hover:border-[#16697A]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
