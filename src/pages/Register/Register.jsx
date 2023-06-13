import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { postToApi } from "../../utils";
import Swal from "sweetalert2";

export default function Register() {
  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    code_technical: "",
    password: "",
    role: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const register = async () => {
    const response = await postToApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/users/register`,
      newUser
    );
    if (response.status === "error")
      return Swal.fire({
        text: `${response.message}`,
        icon: "error",
      });
    if (response.status === "success") {
      const form = document.querySelector("#formRegister");
      form.reset();
      setNewUser({
        first_name: "",
        last_name: "",
        email: "",
        code_technical: "",
        password: "",
      });
      await Swal.fire({
        toast: true,
        icon: "success",
        text: "Register success",
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
    }
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12} md={6} lg={4}>
          <Form id="formRegister">
            <Form.Group className="mb-3" controlId="first_name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="Nombre"
                name="first_name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="last_name">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="Apellido"
                name="last_name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="Email"
                name="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="code_technical">
              <Form.Label>Usuario Urbano</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="Usuario Urbano"
                name="code_technical"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="password"
                placeholder="Password"
                name="password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <select
                name="role"
                className="form-select"
                onChange={handleChange}
                required
              >
                <option value="">Role</option>
                <option value="technical">Tecnico</option>
                <option value="saler">Vendedor</option>
                <option value="premium">Premium</option>
              </select>
            </Form.Group>
            <Button onClick={register} variant="primary">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
