import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";

import { v4 as uuidv4 } from "uuid";

import { Contact } from "@/core/entity/Contact/Contact";
import { ContactRepository } from "@/core/repository/ContactRepository/ContactRepository";
import { UpdateContactDto } from "@/core/repository/ContactRepository/dto/UpdateContactDto";

import { JsonContactsData } from "@/infrastructure/Repositories/Types/ContactTypes";
import { injectable } from "inversify";

@injectable()
export class JsonContactRepository implements ContactRepository {
  private readonly filePath = "Contacts/contacts.json";

  public async create(contact: Contact): Promise<Contact> {
    const data = await this.load();
    if (!data) throw new Error("Failed to load data");

    data.contacts.push(contact);
    data.amount = data.contacts.length;

    await this.save(data);
    return contact;
  }

  public async findById(id: string): Promise<Contact | undefined> {
    const data = await this.load();
    return data?.contacts.find((contact) => contact.id === id);
  }

  public async findAll(): Promise<Contact[]> {
    const data = await this.load();
    return data ? data.contacts : [];
  }

  public async update(id: string, dto: UpdateContactDto): Promise<void> {
    const data = await this.load();
    if (!data)
      throw new Error("Ошибка при загрузке данных, возможен undefined.");

    const contactIndex = data.contacts.findIndex(
      (contact) => contact.id === id
    );
    if (contactIndex === -1) throw new Error(`Контакт с id ${id} - не найден.`);

    const updatedContact = { ...data.contacts[contactIndex], ...dto };
    data.contacts[contactIndex] = updatedContact as Contact;

    await this.save(data);
  }

  public async delete(id: string): Promise<void> {
    const data = await this.load();
    if (!data)
      throw new Error("Ошибка при загрузке данных, возможен undefined.");

    const updatedContacts = data.contacts.filter(
      (contact) => contact.id !== id
    );
    data.amount = updatedContacts.length;

    await this.save({
      amount: data.amount,
      contacts: updatedContacts,
    });
  }

  private async load(): Promise<JsonContactsData | undefined> {
    try {
      const data = await readTextFile(this.filePath, {
        baseDir: BaseDirectory.Download,
      });
      const parsedData = JSON.parse(data);
      return {
        amount: parsedData.amount,
        contacts: parsedData.contacts,
      };
    } catch (error) {
      console.log("Неправильно указан путь: ", error);
    }
  }

  private async save(data: JsonContactsData): Promise<void> {
    try {
      await writeTextFile(this.filePath, JSON.stringify(data, null, 4), {
        baseDir: BaseDirectory.Download,
      });
    } catch (error) {
      console.log("Неправильно указан путь: ", error);
    }
  }

  private generateId(): string {
    return uuidv4();
  }
}
