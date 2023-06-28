import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductDetail from "../../Products/ProductDetail";

export default function AddingProductList({ products, onAddingProduct }) {
  const styleProductItem = { cursor: "pointer" };

  return (
    <Container>
      <Row>
        <Col>
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
              {products.length > 0 &&
                products.map((product) => (
                  <tr
                    key={product.codigo}
                    onClick={() => onAddingProduct(product)}
                    style={styleProductItem}
                  >
                    <ProductDetail product={product} />
                  </tr>
                ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
}
