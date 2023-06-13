import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="site-wrapper">
      <NavBar />
      <Container className="mb-2">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}
