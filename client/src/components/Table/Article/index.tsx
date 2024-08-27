import React, { useEffect, useState } from "react";
import { ArticleDto } from "../../../utils/types/article.type";
import { deleteArticle, getUserArticle } from "../../../utils/api/article.api";
import { Button, Table } from "react-bootstrap";

export const TableArticle = () => {
  const [article, setArticle] = useState<ArticleDto[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const responseArticle = await getUserArticle();

      if (!responseArticle.message) {
        setArticle(responseArticle);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const deleteData = async (id: string) => {
    try {
      await deleteArticle(id);
      await fetchData();
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : error ? (
        <p>Erreur du chargement de l'articles...</p>
      ) : article ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {article?.map((item, key) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{item.topic}</td>
                <td>{item.date}</td>
                <td>
                  <Button onClick={() => deleteData(item._id)}>
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Aucun article</p>
      )}
    </>
  );
};
