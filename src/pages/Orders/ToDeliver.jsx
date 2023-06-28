import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import OrderList from "./OrderList";
import { getFromApi } from "../../utils";

export default function ToDeliver() {
  const [toDeliver, setToDeliver] = useState([]);

  const getOrders = async () => {
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/orders/to-deliver`
    );
    if (response.status === "success") setToDeliver(response.payload);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Container>
      <h3 className="text-center mt-3">
        <span className="badge bg-info">TOTAL {toDeliver.length}</span>
      </h3>
      {toDeliver.length > 0 && <OrderList orders={toDeliver} />}
    </Container>
  );
}
