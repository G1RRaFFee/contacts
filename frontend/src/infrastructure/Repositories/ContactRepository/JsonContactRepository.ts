import {
  readTextFile,
  readDir,
  readFile,
  writeTextFile,
  BaseDirectory,
  writeFile,
} from "@tauri-apps/plugin-fs";

import { Contact } from "@/core/entity/Contact/Contact";
import { ContactRepository } from "@/core/repository/ContactRepository/ContactRepository";

import { JsonContactsData } from "@/infrastructure/Repositories/Types/ContactTypes";
import { injectable } from "inversify";

@injectable()
export class JsonContactRepository implements ContactRepository {
  private readonly filePath = "Contacts/contacts.json";
  private readonly imageFolderPath = "Contacts/images";

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

  public async update(id: string, dto: Contact): Promise<void> {
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

  public async getImagesById(
    id: string
  ): Promise<{ name: string; data: string } | null> {
    let imageData: { name: string; data: string } | null = null;
    try {
      const entries = await readDir(this.imageFolderPath, {
        baseDir: BaseDirectory.Download,
      });

      for (const entry of entries) {
        if (entry.name) {
          if (entry.name.includes(id)) {
            const fileData = await readFile(
              `${this.imageFolderPath}/${entry.name}`,
              {
                baseDir: BaseDirectory.Download,
              }
            );

            const base64String = Buffer.from(fileData).toString("base64");
            imageData = {
              name: entry.name,
              data: `${base64String}`,
            };
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error reading images folder:", error);
      throw new Error("Failed to load images.");
    }

    return imageData;
  }

  public async saveImage(
    id: string,
    imageData: Buffer,
    extension: string = "png"
  ): Promise<string> {
    const filePath = `${this.imageFolderPath}/${id}.${extension}`;
    try {
      await writeFile(filePath, imageData, {
        baseDir: BaseDirectory.Download,
      });
      return filePath;
    } catch (error) {
      console.error("Error saving image:", error);
      throw new Error("Failed to save image.");
    }
  }

  public async linkImageToContact(
    id: string,
    imagePath: string
  ): Promise<void> {
    const data = await this.load();
    if (!data) throw new Error("Failed to load data");

    const contact = data.contacts.find((contact) => contact.id === id);
    if (!contact) throw new Error(`Contact with id ${id} not found.`);

    contact.imageUrl = imagePath;

    await this.save(data);
  }

  private async load(): Promise<JsonContactsData | undefined> {
    try {
      const data = await readTextFile("Contacts/contacts.json", {
        baseDir: BaseDirectory.Download,
      });
      const parsedData = JSON.parse(
        new TextDecoder().decode(data as unknown as undefined)
      );
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
}
