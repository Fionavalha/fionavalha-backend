import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: ["https://www.fionavalha.com.br", "http://192.168.1.100:5173"],
  })
);

app.use(express.json());

app.use(routes);

export default app;
