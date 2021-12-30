import { celebrate, Segments, Joi } from "celebrate";
import { Request, Response, Router } from "express";
import { container } from "tsyringe";

import ListService from "../../domain/service/listService";

const ContactController = Router();

ContactController.get("/", async (req: Request, res: Response) => {
  const listService = container.resolve(ListService);
  const response = await listService.get();
  res.json(response);
});

ContactController.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  async (req: Request, res: Response) => {
    const listService = container.resolve(ListService);
    const { id } = req.params;
    const response = await listService.getById(id);
    res.json(response);
  }
);

ContactController.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const listService = container.resolve(ListService);
    const response = await listService.create(name);
    res.json(response);
  }
);

export default ContactController;
