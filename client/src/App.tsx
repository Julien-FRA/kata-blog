import React from "react";
import Router from "./Router";
import { Header } from "./components/Header";
import { Container } from "react-bootstrap";
import { UserProvider } from "./utils/context/useAuth";

export default function App() {
  return (
    <div className="App">
      <UserProvider>
        <Header />
        <Container fluid="lg" className="mt-3">
          <Router />
        </Container>
      </UserProvider>
    </div>
  );
}
