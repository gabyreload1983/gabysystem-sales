import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

function NavBar() {
  const { user, logoutUserContext } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    await logoutUserContext();
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            GabySystem
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user && (
              <Nav className="me-auto">
                {user.role === "admin" && (
                  <>
                    <Nav.Link as={NavLink} to="/register">
                      Register
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/users">
                      Users
                    </Nav.Link>
                  </>
                )}
                <Nav.Link as={NavLink} to="/customers">
                  Clientes
                </Nav.Link>
                <Nav.Link as={NavLink} to="/products">
                  Productos
                </Nav.Link>
                <Nav.Link as={NavLink} to="/orders">
                  Ordenes de trabajo
                </Nav.Link>
              </Nav>
            )}
            <Nav className="ms-auto">
              {user ? (
                <>
                  <Nav.Link as={NavLink} to="/profile">
                    {user.first_name} {user.last_name}
                  </Nav.Link>
                  <Nav.Link as={NavLink} onClick={logout}>
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
