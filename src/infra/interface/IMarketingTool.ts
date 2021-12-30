import Contact from "../model/Contact";

export default interface IMarketingTool {
  sync(contactsToSync: Array<Contact>): Promise<any>;
  getAllLists(): Promise<any>;
  getListById(id: string): Promise<any>;
  getListMembers(): Promise<any>;
  createList(name: string): Promise<any>;
}
