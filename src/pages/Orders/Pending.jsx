import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import OrderList from "./OrderList";
import { getFromApi, putToApi } from "../../utils";
import Swal from "sweetalert2";
import { UserContext } from "../../context/userContext";

export default function Pending() {
  const { sector } = useParams();
  const [pendings, setPendings] = useState([]);

  const getOrders = async () => {
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/orders/pending/${sector}`
    );
    if (response.status === "success") setPendings(response.payload);
  };

  useEffect(() => {
    getOrders();
  }, [sector]);

  return (
    <Container>
      <h3 className="text-center mt-3">
        <span className="badge bg-warning">TOTAL {pendings.length}</span>
      </h3>

      {pendings.length > 0 && <OrderList orders={pendings} />}
    </Container>
  );
}
