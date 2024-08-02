import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const Header = () => {
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
        </Nav>
      </Container>
    </Navbar>
  );
};
