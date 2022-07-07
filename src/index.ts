import express, { json, request, response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import gameRoutes from "./routes/gameRoutes.js"

dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(gameRoutes);

app.listen(+process.env.PORT, () => console.log(`server started on port ${process.env.PORT}`));