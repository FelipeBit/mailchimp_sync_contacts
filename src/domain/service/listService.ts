import { injectable, scoped, Lifecycle, inject } from "tsyringe";

import IMarketingTool from "../../infra/interface/IMarketingTool";
import IListService from "../interface/service/IListService";

@injectable()
@scoped(Lifecycle.ResolutionScoped)
export default class ListService implements IListService {
  private readonly _mailchimp: IMarketingTool;

  constructor(@inject("IMarketingTool") Mailchimp: IMarketingTool) {
    this._mailchimp = Mailchimp;
  }

  public async get(): Promise<any> {
    const lists: any = this._mailchimp.getAllLists();
    return lists;
  }

  public async getById(id: string): Promise<any> {
    const list: any = this._mailchimp.getListById(id);
    return list;
  }

  public async create(name: string): Promise<any> {
    const newList: any = this._mailchimp.createList(name);
    return newList;
  }
}
