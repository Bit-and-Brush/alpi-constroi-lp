import express from "express";
import { handler as ssrHandler } from "./dist/server/entry.mjs";

const app = express();

// Estáticos gerados no build (inclui index.html e en/index.html pré-renderizados)
app.use(express.static("dist/client"));

// SSR + rotas de API (ex.: POST /api/contact)
app.use(ssrHandler);

// O Passenger (cPanel) intercepta o listen(); localmente usa 4321
const port = process.env.PORT || 4321;
app.listen(port);
