import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import OrderList from "./OrderList";
import { getFromApi } from "../../utils";

export default function FinalDisposition() {
  const [finalDisposition, setFinalDisposition] = useState([]);

  const getOrders = async () => {
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/orders/final-disposition`
    );
    if (response.status === "success") setFinalDisposition(response.payload);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container>
      <h3 className="text-center mt-3">
        <span className="badge bg-info">TOTAL {finalDisposition.length}</span>
      </h3>
      {finalDisposition.length > 0 && <OrderList orders={finalDisposition} />}
    </Container>
  );
}
