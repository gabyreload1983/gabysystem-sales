import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchProduct from "../../components/SearchProduct";
import ProductsList from "./ProductsList";

export default function Products() {
  const [data, setData] = useState({ products: [], dollar: "" });

  const handleChangeProducts = (data) => {
    setData(data);
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={6} lg={4}>
          <SearchProduct onChangeProducts={handleChangeProducts} />
        </Col>
        <Col xs={12}>
          <ProductsList data={data} />
        </Col>
      </Row>
    </Container>
  );
}
