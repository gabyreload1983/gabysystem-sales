import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ProductsInOrder from "./ProductsInOrder";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { getFromApi, getTotalOrder, putToApi } from "../../../utils";
import Swal from "sweetalert2";
import {
  getOrderDiagnosis,
  getOrderState,
  getOrderTier,
  getOrderTierBackground,
  getOrderUbication,
} from "../orderUtils";
import moment from "moment/moment";
import AddingProduct from "./AddingProduct";

export default function OrderDetail() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [order, setOrder] = useState(null);

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
      const order = response.payload;
      setOrder(order);
    }
  };

  const handleAddingProduct = (product) => {
    order.products.push(product);
    order.total = getTotalOrder(order);

    setOrder((prev) => ({
      ...prev,
      products: order.products,
      total: order.total,
    }));
  };

  const handleDeletingProduct = (product) => {
    const index = order.products.findIndex((p) => p.codigo === product.codigo);
    order.products.splice(index, 1);
    order.total = getTotalOrder(order);

    setOrder((prev) => ({
      ...prev,
      products: order.products,
      total: order.total,
    }));
  };

  const handlePrint = async () => {
    await Swal.fire({
      toast: true,
      icon: "success",
      text: `Falta Implementacion`,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  };

  const handleConfirm = async () => {
    await Swal.fire({
      toast: true,
      icon: "success",
      text: `Falta Implementacion`,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  };

  const outOrder = async (id) => {
    try {
      const question = await Swal.fire({
        text: `Queres dar salida a la orden ${order.nrocompro}?`,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
      });
      if (!question.isConfirmed) return;

      const response = await putToApi(
        `http://${import.meta.env.VITE_URL_HOST}/api/orders/out/${id}`
      );
      if (response.status === "success") {
        getOrder();
        await Swal.fire({
          toast: true,
          icon: "success",
          text: `Salida de orden exitosa!`,
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
      if (response.status === "error") {
        await Swal.fire({
          toast: true,
          icon: "error",
          text: `${response.message}`,
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
                          value={order.diagnostico}
                          readOnly
                          className="form-control"
                          rows="3"
                          disabled
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
              <ProductsInOrder
                products={order.products}
                price={order.costo}
                total={order.total}
                onDeletingProduct={handleDeletingProduct}
              />
            </Col>
            {order.estado === 22 && (
              <Col xs={12} className="d-flex justify-content-between mb-3">
                <button
                  className="btn btn-sm btn-outline-warning"
                  onClick={handlePrint}
                >
                  Imprimir
                </button>
                <div className="btn-group">
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={handleConfirm}
                  >
                    Confirmar
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={getOrder}
                  >
                    Cancelar
                  </button>
                </div>
              </Col>
            )}
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
          <Row>
            <Col>
              {order.estado === 22 && (
                <AddingProduct onAddingProduct={handleAddingProduct} />
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
