import React from "react";
import Card from "../../atoms/Card";
import formatRupiah from "../../../utils/formatRupiah";

const RevenueCard = () => (
  <Card title="Revenue">
    <p className="text-2xl font-bold">{formatRupiah(4050000)}</p>
  </Card>
);

export default RevenueCard;
