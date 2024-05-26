// index.js
import express from "express"; // Importation du module express

import router from "./router.js";
import cors from "cors";

const app = express(); // Création de l'application express
const port = process.env.PORT || 3000; // Définition du port d'écoute du serveur

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
// Start the server
app.listen(port, () =>
  console.log(`Server is running on http:/localhost:${port}`),
);
