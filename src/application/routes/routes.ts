import { Router } from "express";

import ContactController from "../controller/contactController";
import ListController from "../controller/listController";

const routes = Router();

routes.use("/contacts", ContactController);
routes.use("/lists", ListController);

export default routes;
