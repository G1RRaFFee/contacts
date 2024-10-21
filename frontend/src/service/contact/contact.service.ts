import IContact from "@/interface/contact";
import { Storage } from "@/storage/storage";

//* Проверка на существание пользователя, не сохдавать дубликаты.
//* Создавать файл по шаблону, если исходный удален,
//* Создавать файл в папке,
//* Шифровать данные о контактах.

interface IContactService {
  addContact(contact: IContact): void;
  getAllContacts(): Promise<IContact[] | undefined>;
}

export class ContactService implements IContactService {
  private storage: Storage;
  constructor(storage: Storage) {
    this.storage = storage;
  }

  public async addContact(contact: IContact): Promise<void> {
    try {
      const data = await this.storage.load();
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
}
