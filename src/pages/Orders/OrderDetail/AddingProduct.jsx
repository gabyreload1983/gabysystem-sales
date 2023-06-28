import React, { useState } from "react";
import SearchProduct from "./../../../components/SearchProduct";
import AddingProductList from "./AddingProductList";
import { Col, Container, Row } from "react-bootstrap";

export default function AddingProduct({ onAddingProduct }) {
  const [products, setProducts] = useState([]);

  const handleChangeProducts = (products) => {
    setProducts(products);
  };
  return (
    <>
      <Container>
        <h1>Agregar Producto</h1>
        <Row>
          <Col xs={12} md={6} lg={4}>
            <SearchProduct onChangeProducts={handleChangeProducts} />
          </Col>
          <Col xs={12}>
            <AddingProductList
              products={products}
              onAddingProduct={onAddingProduct}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
