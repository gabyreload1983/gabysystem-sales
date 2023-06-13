import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getFromApi } from "../../utils";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setusers] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    const response = await getFromApi(
      `http://${import.meta.env.VITE_URL_HOST}/api/users`
    );
    if (response.status === "success") setusers(response.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const editUser = async (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Users</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Codigo Urbano</th>
                <th scope="col">Role</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <th>
                        {user.first_name} {user.last_name}
                      </th>
                      <th>{user.email}</th>
                      <th>{user.code_technical}</th>
                      <th>{user.role}</th>
                      <th>
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => editUser(user._id)}
                        >
                          edit
                        </button>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
}
