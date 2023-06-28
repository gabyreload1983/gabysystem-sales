import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../context/userContext";
import SearchOrder from "./SearchOrder";

export default function OrdersLayout() {
  const { user } = useContext(UserContext);
  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/orders/pending/pc" end>
                PC Pendientes
              </Nav.Link>
              <Nav.Link as={NavLink} to="/orders/pending/imp">
                Impresoras Pendientes
              </Nav.Link>
              <Nav.Link as={NavLink} to="/orders/in-process">
                Ordenes En Proceso
              </Nav.Link>
              <Nav.Link as={NavLink} to="/orders/to-deliver">
                Ordenes Para Entregar
              </Nav.Link>
              <Nav.Link as={NavLink} to="/orders/final-disposition">
                Disposicion Final
              </Nav.Link>
            </Nav>
            <SearchOrder />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Container>
  );
}
