import React from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isTurno, getOrderTier, getOrderTierBackground } from "./orderUtils";
import moment from "moment";

export default function OrderList({ orders, onTakeOrder }) {
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>FECHA</th>
            <th>NRO ORDEN</th>
            <th>CLIENTE</th>
            <th>TIER</th>
            <th>
              {" "}
              {orders.length > 0 && orders[0].estado === 22 && "TECNICO"}
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => {
              return (
                <tr
                  key={`${order.nrocompro}`}
                  className={getOrderTierBackground(order.prioridad)}
                >
                  <td>
                    {moment(order.ingresado).format("DD/MM/YYYY hh:mm a")}
                  </td>
                  <td>
                    <Link
                      to={`/orders/${order.nrocompro}`}
                      className="link-order"
                    >
                      {order.nrocompro}
                      {isTurno(order.falla) && (
                        <span className="badge bg-dark ms-2">TURNO</span>
                      )}
                    </Link>
                  </td>
                  <td>{order.nombre} - </td>
                  <td>{getOrderTier(order.prioridad)}</td>
                  <td>{order.estado === 22 && order.tecnico}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
