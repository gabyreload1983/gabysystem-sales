import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductsInOrder from "./ProductsInOrder";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { getFromApi, putToApi } from "../../../utils";
import Swal from "sweetalert2";
import {
  getOrderDiagnosis,
  getOrderState,
  getOrderTier,
  getOrderTierBackground,
  getOrderUbication,
} from "../orderUtils";
import moment from "moment/moment";

export default function OrderDetail() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [price, setPrice] = useState(null);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const getOrder = async () => {
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/orders/${id}`
    );
    if (response.status === "error") {
      Swal.fire({
        text: `${response.message}`,
        icon: "error",
      });
    }

    if (response.status === "success") {
      const { order } = response;
      setOrder(order);
      setDiagnosis(order.diagnostico);
      setPrice(Number(order.costo));
      setTotal(Number(order.total));
    }
  };

  const outOrder = async (id) => {
    try {
      const response = await Swal.fire({
        text: `Queres dar salida a la orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!response.isConfirmed) return;
      return await Swal.fire({
        text: `Falta implementacion`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      const data = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/out`,
        {
          nrocompro: `${order.nrocompro}`,
          code_technical: `${user.code_technical}`,
        }
      );
      if (data.status === "error")
        return Swal.fire({
          text: `${data.message}`,
          icon: "error",
        });
      if (data.status === "success") {
        await getOrder();

        await Swal.fire({
          toast: true,
          icon: "success",
          text: `Se dio salida a la orden ${order.nrocompro}`,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      }
    } catch (error) {
      Swal.fire({
        text: `${error.message}`,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    getOrder();
  }, [id]);

  return (
    <>
      {order && (
        <Container className="mt-3">
          <Button variant="outline-secondary" onClick={goBack}>
            &larr; <span>Volver</span>
          </Button>
          <h2>
            {order.nombre} - {order.nrocompro}
          </h2>
          <Row>
            <Col xs={12} md={6}>
              <Table striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>ESTADO</td>
                    <td>{getOrderState(order.estado)}</td>
                  </tr>
                  <tr>
                    <td>DIAGNOSTICO</td>
                    <td>{getOrderDiagnosis(order.diag)}</td>
                  </tr>
                  <tr>
                    <td>UBICACION</td>
                    <td>{getOrderUbication(order.ubicacion)}</td>
                  </tr>
                  <tr>
                    <td>FECHA INGRESO</td>
                    <td>
                      {moment(order.ingresado).format("DD/MM/YYYY hh:mm a")}
                    </td>
                  </tr>
                  <tr>
                    <td>PRIORIDAD</td>
                    <td className={getOrderTierBackground(order.prioridad)}>
                      {getOrderTier(order.prioridad)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col xs={12} md={6}>
              <Table striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>TELEFONO</td>
                    <td>{order.telefono}</td>
                  </tr>
                  <tr>
                    <td>ARTICULO</td>
                    <td>{order.descart}</td>
                  </tr>
                  <tr>
                    <td>ACCESORIOS</td>
                    <td>{order.accesorios}</td>
                  </tr>
                  <tr>
                    <td>VENDEDOR</td>
                    <td>{order.operador}</td>
                  </tr>
                  <tr>
                    <td>TECNICO</td>
                    <td>{order.tecnico}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col xs={12}>
              <Table striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>
                      FALLA: <span>{order.falla}</span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col xs={12}>
              <Table striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>
                      <div className="mb-3">
                        <label className="form-label">Diagnostico</label>
                        <textarea
                          value={diagnosis}
                          readOnly
                          className="form-control"
                          rows="5"
                        ></textarea>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h3>DETALLE</h3>
              <ProductsInOrder order={order} total={total} price={price} />
            </Col>
          </Row>
          <Row>
            <Col className="text-end">
              {order.estado === 23 && order.ubicacion === 21 && (
                <Button
                  variant="danger"
                  onClick={() => outOrder(order.nrocompro)}
                >
                  Salida
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
