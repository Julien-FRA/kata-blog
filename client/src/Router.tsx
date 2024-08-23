import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { NoPage } from "./pages/NoPage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { useAuth } from "./utils/context/useAuth";
import { ContentArticle } from "./components/Content/Article";
import { AddArticle } from "./components/Form/Article";

type Props = { children: React.ReactNode };

const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/article/:articleId"
          element={
            <ProtectedRoute>
              <ContentArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/article/add"
          element={
            <ProtectedRoute>
              <AddArticle />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
