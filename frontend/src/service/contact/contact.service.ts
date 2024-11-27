import { exists, create, BaseDirectory } from "@tauri-apps/plugin-fs";
import { downloadDir } from "@tauri-apps/api/path";
import { v4 as uuidv4 } from "uuid";

import { Contact, OuterContactData } from "@/interface/contact";
import { Storage } from "@/storage/storage";
import { DeserializedContactsData } from "@/interface/contactsData";
import IContactService from "@/interface/service/contact.service";

// TODO: "Шифровать данные о контактах".

class ContactService implements IContactService {
  private storage: Storage;
  constructor(storage: Storage) {
    this.storage = storage;
  }

  public async create(contact: Contact): Promise<void> {
    try {
      await this.ensureContactsFile();
      const data: DeserializedContactsData | undefined =
        await this.storage.load();
      contact.id = this.getID();
      if (data) {
        data.contacts.push(contact);
        data.contactsCount = data.contacts.length;
        await this.storage.save(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public getID(): string {
    return uuidv4();
  }

  public async delete(id: string): Promise<void> {
    try {
      const data = await this.storage.load();
      if (data) {
        data.contacts = data.contacts.filter(
          (contact: Contact) => contact.id !== id
        );
        data.contactsCount = data.contacts.length;
        await this.storage.save(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async update(updatedContact: Contact): Promise<void> {
    try {
      const data = await this.storage.load();
      if (data) {
        const index = data.contacts.findIndex(
          (contact: Contact) => contact.id === updatedContact.id
        );

        if (index !== -1) {
          data.contacts[index] = {
            ...data.contacts[index],
            ...updatedContact,
          };
          await this.storage.save(data);
          console.log("Контакт обновлен.");
        } else {
          await this.create(updatedContact);
          // console.error("Контакт с указанным ID не найден.");
        }
      }
    } catch (error) {
      console.error("Ошибка при обновлении контакта:", error);
    }
  }

  public async getAllOuterContactsData(): Promise<
    OuterContactData[] | undefined
  > {
    try {
      const contactsOuterData: OuterContactData[] = [];

      const response: DeserializedContactsData | undefined =
        await this.storage.load();
      response?.contacts.forEach((contact: Contact) => {
        contactsOuterData.push({
          id: contact.id,
          name: contact.name,
          groups: contact.groups,
          tags: contact.tags,
        });
      });
      return contactsOuterData;
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllContacts(): Promise<Contact[] | undefined> {
    try {
      const result = await this.storage.load();
      return result?.contacts;
    } catch (error) {
      console.log(error);
    }
  }

  public async getContactsCount(): Promise<number | undefined> {
    try {
      const result = await this.storage.load();
      return result?.contactsCount;
    } catch (error) {
      console.log(error);
    }
  }

  public async getContactById(id: string): Promise<Contact | undefined> {
    try {
      const data = await this.storage.load();
      if (data) {
        return data.contacts.find((contact: Contact) => contact.id === id);
      }
    } catch (error) {
      console.error("Ошибка при получении контакта по ID:", error);
    }
    return undefined;
  }

  private async ensureContactsFile(): Promise<void> {
    try {
      const downloadPath = await downloadDir();
      const contactsFolderPath = `${downloadPath}/Contacts`;

      const folderExists = await exists(contactsFolderPath);
      if (!folderExists) {
        await create("Contacts", { baseDir: BaseDirectory.Download });
        console.log("Папка создана");
      }

      const fileExists = await exists(`${contactsFolderPath}/contacts.json`);
      if (!fileExists) {
        const initialData: DeserializedContactsData = {
          contactsCount: 0,
          contacts: [],
        };
        await this.storage.save(initialData);
        console.log("файл создан.");
      }
    } catch (error) {
      console.error("Ошибка при проверке и создании файлов:", error);
    }
  }
}
