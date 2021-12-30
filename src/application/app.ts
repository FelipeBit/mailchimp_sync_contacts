import { errors } from "celebrate";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import Ioc from "./config/ioc";
import appError from "./middleware/appError";
import routes from "./routes/routes";

dotenv.config();

const ioc = new Ioc();
ioc.configureServices();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", routes);
app.use(errors());
app.use(appError);

export default app;
