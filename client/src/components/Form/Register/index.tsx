import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserDto } from "../../../utils/types/user.type";
import { userRegister } from "../../../utils/api/user.api";
import { Alert, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const FormRegister = () => {
  const { register, handleSubmit } = useForm<CreateUserDto>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data: CreateUserDto) => {
    const res: any = await userRegister({
      email: data.email,
      name: data.name,
      password: data.password,
    });

    if (res.user) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setSuccess(false);
      setError(true);
    }
  });

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Adresse mail</Form.Label>
        <Form.Control
          required
          type="email"
          placeholder="Votre adresse mail"
          {...register("email")}
        />
      </Form.Group>
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
        <Alert variant="success">Votre compte a été créée avec succès !</Alert>
      )}
      {error && (
        <Alert variant="danger">
          Erreur lors de la création de votre compte...
        </Alert>
      )}
      <Button variant="primary" type="submit">
        Envoyer
      </Button>
    </Form>
  );
};
