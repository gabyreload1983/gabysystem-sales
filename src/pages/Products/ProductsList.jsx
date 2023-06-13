import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { formatPrice, getFinalPrice } from "../../utils";

export default function ProductsList({ data }) {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Lista de Productos</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">CODIGO</th>
                <th scope="col">DESCRIPCION</th>
                <th scope="col">STOCK</th>
                <th scope="col">PRECIO FINAL</th>
              </tr>
            </thead>
            <tbody>
              {data.products.length > 0 &&
                data.products.map((p) => (
                  <tr key={p.codigo}>
                    <td>{p.codigo}</td>
                    <td>{p.descrip}</td>
                    <td>{p.stockd01 - p.reserd01}</td>
                    <td>
                      $
                      {formatPrice(
                        getFinalPrice(p.lista1, p.grabado, data.dollar)
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
}
