import React from "react";
import { CardArticle } from "../components/Card/Article";
import { Button } from "react-bootstrap";

export const Home = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Liste des articles</h1>
        <Button href="/article/add">Ajouter mon article</Button>
      </div>
      <CardArticle />
    </>
  );
};
