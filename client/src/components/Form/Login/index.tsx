import React, { useState } from "react";
import { Alert, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { LoginUserDto } from "../../../utils/types/user.type";
import { userLogin } from "../../../utils/api/user.api";

export const FormLogin = () => {
  const { register, handleSubmit } = useForm<LoginUserDto>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data: LoginUserDto) => {
    const res: any = await userLogin({
      name: data.name,
      password: data.password,
    });

    if (res.token) {
      localStorage.setItem("token", res.token);
      setSuccess(true);
      setError(false);
    } else {
      setSuccess(false);
      setError(true);
    }
  });

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          required
          type="name"
          placeholder="Votre nom"
          {...register("name")}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder="Votre mot de passe"
          {...register("password")}
        />
      </Form.Group>
      {success && (
        <Alert variant="success">
          Vous êtes connecté !
          <br />
          <Alert.Link href="/">Page d'accueil</Alert.Link>
        </Alert>
      )}
      {error && <Alert variant="danger">Erreur lors de la connection...</Alert>}
      <Button variant="primary" type="submit">
        Envoyer
      </Button>
    </Form>
  );
};
