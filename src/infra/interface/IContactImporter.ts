import Contact from "../model/Contact";

export default interface IContactImporter {
  importContacts(): Promise<Contact[]>;
}
