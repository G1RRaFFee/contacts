import { exists, createDir, BaseDirectory } from "@tauri-apps/api/fs";
import { downloadDir } from "@tauri-apps/api/path";

import IContact from "@/interface/contact";
import { Storage } from "@/storage/storage";
import IData from "@/interface/contactsData";

//* Проверка на существание пользователя, не создавать дубликаты.
//* Создавать файл по шаблону, если исходный удален,
//* Создавать файл в папке,
//* Шифровать данные о контактах.

interface IContactService {
  addContact(contact: IContact): void;
  getAllContacts(): Promise<IContact[] | undefined>;
  getContactById(id: string): Promise<IContact | undefined>;
  ensureContactsFile(): Promise<void>;
}

export class ContactService implements IContactService {
  private storage: Storage;
  constructor(storage: Storage) {
    this.storage = storage;
  }

  public async addContact(contact: IContact): Promise<void> {
    try {
      await this.ensureContactsFile();

      const data: IData | undefined = await this.storage.load();
      if (data) {
        data.contacts.push(contact);
        data.totalCount = data.contacts.length;
        await this.storage.save(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllContacts(): Promise<IContact[] | undefined> {
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
      return result?.totalCount;
    } catch (error) {
      console.log(error);
    }
  }

  public async getContactById(id: string): Promise<IContact | undefined> {
    try {
      const data = await this.storage.load();
      if (data) {
        return data.contacts.find((contact) => contact.id === id);
      }
    } catch (error) {
      console.error("Ошибка при получении контакта по ID:", error);
    }
    return undefined;
  }

  public async ensureContactsFile(): Promise<void> {
    try {
      const downloadPath = await downloadDir();
      const contactsFolderPath = `${downloadPath}Contacts`;

      const folderExists = await exists(contactsFolderPath);
      if (!folderExists) {
        await createDir("Contacts", { dir: BaseDirectory.Download });
        console.log("Папка создана");
      }

      const fileExists = await exists(`${contactsFolderPath}/contacts.json`);
      if (!fileExists) {
        const initialData = {
          totalCount: 0,
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
