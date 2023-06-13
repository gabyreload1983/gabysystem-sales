import React from "react";
import { Table } from "react-bootstrap";

export default function ProductsInOrder({ order, total, price }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Descripcion</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>.ST</td>
          <td>Mano de Obra</td>
          <td className="custom-td text-end">${price}</td>
        </tr>
        {order.products.map((p, index) => {
          return (
            <tr key={`${p.nrocompro}${index}`}>
              <td>{p.codigo}</td>
              <td>{p.descrip}</td>

              <td className="custom-td text-end">${p.priceWithTax}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>Total</td>
          <td className="custom-td text-end">${total.toFixed(2)}</td>
        </tr>
      </tfoot>
    </Table>
  );
}
