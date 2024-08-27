import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../../utils/context/useAuth";

export const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container fluid className="justify-content-between">
        <Nav>
          <Navbar.Brand>Blog</Navbar.Brand>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav>
          {isLoggedIn() ? (
            <div className="d-flex align-items-center">
              <p className="mb-0 me-2">Bienvenue {user?.name}</p>
              <Nav.Link href="/profil">Profil</Nav.Link>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </div>
          ) : (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
