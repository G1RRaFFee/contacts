import Service from "@/interface/service/base";

import { Contact } from "@/interface/contact";
import { OuterContactData } from "@/interface/contact";

export default interface IContactService extends Service<Contact> {
  create: (contact: Contact) => Promise<void>;
  delete: (id: string) => Promise<void>;
  update: (updatedContact: Contact) => Promise<void>;
  getID: () => string;
  getAllContacts: () => Promise<Contact[] | undefined>;
  getAllOuterContactsData: () => Promise<OuterContactData[] | undefined>;
  getContactById: (id: string) => Promise<Contact | undefined>;
}
