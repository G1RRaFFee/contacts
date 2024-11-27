// import { Contact } from "@/core/entity/Contact/Contact";
import { injectable } from "inversify";

import { ContactService } from "@/core/service/ContactService/ContactService";
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

  public async getAll(): Promise<Contact[] | undefined> {
    try {
      return await this.service.getAll();
    } catch (error) {
      console.error(
        "Ошибка при получении контактов (ContactController | getAll):",
        error
      );
    }
  }

  public async getById(id: string): Promise<Contact | undefined> {
    try {
      return await this.service.findById(id);
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

  public generateId(): string {
    return this.service.generateId();
  }
  //   public async update(id: string, contact: Contact): Promise<void> {
  //     try {
  //       await this.service.update(id, contact);
  //       console.log("Contact updated");
  //     } catch (error) {
  //       console.error("Error updating contact:", error);
  //     }
  //   }
}
