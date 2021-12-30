import { injectable, scoped, Lifecycle, inject } from "tsyringe";

import IContactImporter from "../../infra/interface/IContactImporter";
import IMarketingTool from "../../infra/interface/IMarketingTool";
import IContactService from "../interface/service/IContactService";

@injectable()
@scoped(Lifecycle.ResolutionScoped)
export default class ContactService implements IContactService {
  private readonly _mailchimp: IMarketingTool;
  private readonly _mockAPI: IContactImporter;

  constructor(
    @inject("IMarketingTool") Mailchimp: IMarketingTool,
    @inject("IContactImporter") MockAPI: IContactImporter
  ) {
    this._mailchimp = Mailchimp;
    this._mockAPI = MockAPI;
  }

  public async syncContacts(): Promise<any> {
    const contactsToImport: any = await this._mockAPI.importContacts();
    const contactsImported: any = await this._mailchimp.sync(contactsToImport);
    return contactsImported;
  }
}
