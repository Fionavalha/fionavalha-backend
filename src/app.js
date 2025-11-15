import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: "https://www.fionavalha.com.br",
  })
);

app.use(express.json());

app.use(routes);

export default app;
