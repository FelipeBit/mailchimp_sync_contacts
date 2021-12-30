import axios from "axios";

import AppError from "../helper/appError";
import logger from "../helper/logger";
import IContactImporter from "../interface/IContactImporter";
import Contact from "../model/Contact";

const mockAPIAxiosConfig = axios.create({
  baseURL: process.env.MOCK_API_BASE_URL,
});
export default class MockAPI implements IContactImporter {
  async importContacts(): Promise<Contact[]> {
    try {
      const contacts: Contact[] = [];
      const response = await mockAPIAxiosConfig.get("/contacts");
      response.data.forEach((contact) => {
        contacts.push({
          email: contact.email,
          firstName: contact.firstName,
          lastName: contact.lastName,
        });
      });

      return contacts;
    } catch (e) {
      logger.error(e);
      throw new AppError(
        JSON.stringify({
          data: e,
        }),
        500
      );
    }
  }
}
