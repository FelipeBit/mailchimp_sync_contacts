import mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";

import AppError from "../helper/appError";
import logger from "../helper/logger";
import IMarketingTool from "../interface/IMarketingTool";
import Contact from "../model/Contact";

mailchimp.setConfig({
  accessToken: process.env.MAIL_CHIMP_ACCESS_TOKEN,
  server: process.env.MAIL_CHIMP_SERVER,
});

export default class Mailchimp implements IMarketingTool {
  private listId = process.env.MAIL_CHIMP_LIST_ID;
  async sync(contactsToSync: Array<Contact>): Promise<any> {
    try {
      let totalSyncedContacts = 0;
      const syncedContacts = [];
      for (const contact of contactsToSync) {
        const { firstName, lastName, email } = contact;
        const subscriberHash = md5(email.toLowerCase());
        const response = await mailchimp.lists.setListMember(
          this.listId,
          subscriberHash,
          {
            email_address: email,
            status_if_new: "pending",
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName,
            },
          }
        );
        if (response.id) {
          syncedContacts.push(contact);
          totalSyncedContacts += 1;
        }
      }

      const response = {
        syncedContacts: totalSyncedContacts,
        contacts: syncedContacts,
      };

      return response;
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

  async getListMembers(): Promise<any> {
    try {
      const response = await mailchimp.lists.getListMembersInfo(this.listId);
      return response;
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

  async getAllLists(): Promise<any> {
    try {
      const response = await mailchimp.lists.getAllLists();
      return response;
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

  async getListById(id: string): Promise<any> {
    try {
      const response = await mailchimp.lists.getList(id);
      return response;
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

  async createList(name: string): Promise<any> {
    try {
      const response = await mailchimp.lists.createList({
        name,
        permission_reminder: "permission_reminder",
        email_type_option: true,
        contact: {
          company: "company",
          address1: "address1",
          city: "city",
          country: "country",
        },
        campaign_defaults: {
          from_name: "from_name",
          from_email: "Beulah_Ryan@hotmail.com",
          subject: "subject",
          language: "language",
        },
      });

      return response;
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
