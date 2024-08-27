import React from "react";
import { FormUser } from "../components/Form/Profil/FormUser";
import { TableArticle } from "../components/Table/Article";

export const Profil = () => {
  return (
    <div>
      <p className="h1">Profil</p>
      <FormUser />
      <p className="h1 mt-4">Mes articles</p>
      <TableArticle />
    </div>
  );
};
