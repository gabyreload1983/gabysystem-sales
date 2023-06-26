import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchProduct from "../../components/SearchProduct";
import ProductsList from "./ProductsList";

export default function Products() {
  const [products, setProducts] = useState([]);

  const handleChangeProducts = (products) => {
    setProducts(products);
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={6} lg={4}>
          <SearchProduct onChangeProducts={handleChangeProducts} />
        </Col>
        <Col xs={12}>
          <ProductsList products={products} />
        </Col>
      </Row>
    </Container>
  );
}
