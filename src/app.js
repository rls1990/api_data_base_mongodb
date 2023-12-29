import express from "express";
import morgan from "morgan";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.routes.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    url: ["http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

//routes
app.use("/api", usuarioRoutes);

export default app;
