import "reflect-metadata";
import ListService from "../../src/domain/service/listService";
import Mailchimp from "../../src/infra/mailchimp/mailchimp";
import createListResponse from "./mock/createListResponse";
import getAllListsResponse from "./mock/getAllListsResponse";
import getListByIdResponse from "./mock/getLisByIdResponse";

const mailchimp = new Mailchimp();
const listService = new ListService(mailchimp);

describe("List service test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mailchimp.getAllLists = jest.fn().mockResolvedValue(getAllListsResponse);
    mailchimp.getListById = jest.fn().mockResolvedValue(getListByIdResponse);
    mailchimp.createList = jest.fn().mockResolvedValue(createListResponse);
  });

  it("Should return all lists", async () => {
    const result = await listService.get();
    expect(result).toStrictEqual(getAllListsResponse);
  });

  it("Should return a single list", async () => {
    const result = await listService.getById("f16e4f6f6a");
    expect(result).toStrictEqual(getListByIdResponse);
  });

  it("Should create a list", async () => {
    const result = await listService.create("Felipe Bittencourt");
    expect(result).toStrictEqual(createListResponse);
  });
});
