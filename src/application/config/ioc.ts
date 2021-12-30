import "reflect-metadata";
import { container } from "tsyringe";

import Mailchimp from "../../infra/mailchimp/mailchimp";
import MockAPI from "../../infra/mockAPI/mockAPI";

export default class Ioc {
  public configureServices(): void {
    container.register("IMarketingTool", {
      useClass: Mailchimp,
    });
    container.register("IContactImporter", {
      useClass: MockAPI,
    });
  }
}
