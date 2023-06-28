import React from "react";
import { Table } from "react-bootstrap";
import { formatPrice } from "../../../utils";

export default function ProductsInOrder({
  products,
  price,
  total,
  onDeletingProduct,
}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Descripcion</th>
          <th>Precio</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>.ST</td>
          <td>Mano de Obra</td>
          <td className="custom-td text-end">${formatPrice(price)}</td>
          <td></td>
        </tr>
        {products.length > 0 &&
          products.map((product, index) => {
            return (
              <tr key={`${product.nrocompro}-${index}`}>
                <td>{product.codigo}</td>
                <td>{product.descrip}</td>

                <td className="custom-td text-end">
                  ${formatPrice(product.priceList1WithTax)}
                </td>
                <td className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDeletingProduct(product)}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>Total</td>
          <td className="custom-td text-end">${formatPrice(total)}</td>
          <td></td>
        </tr>
      </tfoot>
    </Table>
  );
}
