import React from "react";

const Card = ({ title, children }) => (
  <div className="p-4 bg-white shadow rounded-lg">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    {children}
  </div>
);

export default Card;
