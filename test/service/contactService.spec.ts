import "reflect-metadata";
import ContactService from "../../src/domain/service/contactService";
import Mailchimp from "../../src/infra/mailchimp/mailchimp";
import MockAPI from "../../src/infra/mockAPI/mockAPI";
import importContactsResponse from "./mock/importContactsResponse";
import syncContactsResponse from "./mock/syncContactsResponse";

const mailchimp = new Mailchimp();
const mockAPI = new MockAPI();
const contactService = new ContactService(mailchimp, mockAPI);

describe("List service test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAPI.importContacts = jest
      .fn()
      .mockResolvedValue(importContactsResponse);
    mailchimp.sync = jest.fn().mockResolvedValue(syncContactsResponse);
  });

  it("Should return contacts to sync", async () => {
    const result = await contactService.syncContacts();
    expect(result).toStrictEqual(syncContactsResponse);
  });
});
