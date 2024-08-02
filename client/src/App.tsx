import React from "react";
import Router from "./Router";
import { Header } from "./components/Header";
import { Container } from "react-bootstrap";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Container fluid="lg" className="mt-3">
        <Router />
      </Container>
    </div>
  );
}
