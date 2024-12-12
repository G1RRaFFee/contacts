// import { Contact } from "@/core/entity/Contact/Contact";
import { injectable } from "inversify";

import { ContactService } from "@/core/service/ContactService/Contact.service";
import { Contact } from "@/core/entity/Contact/Contact";

@injectable()
export class ContactController {
  constructor(private readonly service: ContactService) {}

  public async create(contact: Contact): Promise<Contact | undefined> {
    try {
      return await this.service.create(contact);
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  }

  public async getAll(): Promise<Contact[]> {
    return await this.service.getAll();
  }

  public async getById(id: string) {
    return await this.service.findById(id);
  }

  public async update(id: string, updatedContact: Contact): Promise<void> {
    try {
      return await this.service.update(id, updatedContact);
    } catch (error) {
      console.error(
        "Ошибка при получении контакта (ContactController | getById):",
        error
      );
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.service.delete(id);
      console.log("Contact deleted");
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }

  public async getImageById(id: string) {
    try {
      return await this.service.getImageById(id);
    } catch (error) {
      console.error(
        "Ошибка при получении изображения контакта (ContactController | getImageById):",
        error
      );
    }
  }

  public async saveImage(
    id: string,
    imageData: Buffer,
    extension: string | "png"
  ) {
    try {
      return await this.service.saveImage(id, imageData, extension);
    } catch (error) {
      console.log(error);
    }
  }

  public async linkImagetoContact(id: string, imagePath: string) {
    try {
      await this.service.linkImageToContact(id, imagePath);
    } catch (error) {
      console.log(error);
    }
  }

  public generateId(): string {
    return this.service.generateId();
  }
}
