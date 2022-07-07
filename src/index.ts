import express, { json, request, response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());


app.listen(+process.env.PORT, () => console.log(`server started on port ${process.env.PORT}`));