import React from "react";
import Router from "./Router";
import { Header } from "./components/Header";
import { Container } from "react-bootstrap";
import { useAuth } from "./utils/hooks/useAuth";
import { AuthContext } from "./utils/context/AuthContext";

export default function App() {
  const { token, setToken } = useAuth();
  console.log(" prout", token);

  return (
    <div className="App">
      <AuthContext.Provider value={{ token, setToken }}>
        <Header />
        <Container fluid="lg" className="mt-3">
          <Router />
        </Container>
      </AuthContext.Provider>
    </div>
  );
}
