import { Request, Response, Router } from "express";
import { container } from "tsyringe";

import ContactService from "../../domain/service/contactService";

const ContactController = Router();

ContactController.get("/sync", async (req: Request, res: Response) => {
  const contactService = container.resolve(ContactService);
  const response = await contactService.syncContacts();
  res.json(response);
});

export default ContactController;
