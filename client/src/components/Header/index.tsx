import React, { useContext, useEffect } from "react";
import { useAuth } from "../../utils/hooks/useAuth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../../utils/context/AuthContext";
import { useLocalStorage } from "../../utils/hooks/useLocalStorage";

export const Header = () => {
  const { logout, token } = useAuth();

  console.log(token);

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container fluid className="justify-content-between">
        <Nav>
          <Navbar.Brand>Blog</Navbar.Brand>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
          <Nav.Link onClick={logout} href="/register">
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
