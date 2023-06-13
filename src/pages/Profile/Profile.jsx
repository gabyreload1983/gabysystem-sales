import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Container } from "react-bootstrap";

export default function Profile() {
  const { user } = useContext(UserContext);
  return (
    <Container>
      {user && (
        <div>
          <p>Nombre: {user.first_name}</p>
          <p>Apellido: {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Codigo Urbano: {user.code_technical}</p>
          <p>Rol: {user.role}</p>
        </div>
      )}
    </Container>
  );
}
