import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFromApi, putToApi } from "../../utils";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

export default function UserDetail() {
  const { id } = useParams();
  const [updateUser, setUpdateUser] = useState(null);

  const getUser = async () => {
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/users/${id}`
    );
    if (response.status === "success") setUpdateUser(response.user);
  };
  useEffect(() => {
    getUser();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdateUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const update = async () => {
    const response = await putToApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/users/${id}`,
      updateUser
    );
    if (response.status === "error")
      return Swal.fire({
        text: `${response.message}`,
        icon: "error",
      });
    if (response.status === "success") {
      await Swal.fire({
        toast: true,
        icon: "success",
        text: "Update user success",
        position: "top-end",
        timer: 1000,
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
          {updateUser && (
            <Form id="formRegister">
              <Form.Group className="mb-3" controlId="first_name">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  placeholder="Nombre"
                  name="first_name"
                  required
                  value={updateUser.first_name}
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
                  value={updateUser.last_name}
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
                  value={updateUser.email}
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
                  value={updateUser.code_technical}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <select
                  name="role"
                  className="form-select"
                  onChange={handleChange}
                  required
                >
                  <option value="">Actualizar Rol</option>
                  <option value="technical">Tecnico</option>
                  <option value="saler">Vendedor</option>
                  <option value="premium">Premium</option>
                </select>
              </Form.Group>
              <Button onClick={update} variant="primary">
                Update
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
}
